from datetime import datetime
from fastapi import FastAPI, Header
from starlette.responses import StreamingResponse
import cv2
import time
from ultralytics import YOLO
from tracker import Tracker
import cvzone
from db_config import get_db_connection
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


prev_left_count = 0
prev_right_count = 0

# Initialize your model outside of your endpoint
model = YOLO('appleDetection.pt')

# Function to process and yield frames
def frame_generator(video_url):
    global prev_left_count, prev_right_count
    cap = cv2.VideoCapture(video_url)
    if not cap.isOpened():
        raise ValueError(f"Couldn't open video stream from URL: {video_url}")
    
    count = 0
    person_left = {}
    person_right = {}
    tracker = Tracker()
    counter_left = []
    counter_right = []
    cx1 = 200  # Define vertical line for left-to-right movement
    cx2 = 230  # Define vertical line for right-to-left movement
    offset = 10

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            frame = cv2.resize(frame, (640, 640))

            results = model.predict(frame, conf=0.1, iou=0.5)
            detections = results[0].boxes.data.cpu().numpy()

            apple_detections = [[int(det[0]), int(det[1]), int(det[2]), int(det[3])] for det in detections]
            bbox_id = tracker.update(apple_detections)
            
            for bbox in bbox_id:
                x3, y3, x4, y4, id = bbox
                cx = int(x3 + x4) // 2
                cy = int(y3 + y4) // 2
                cv2.circle(frame, (cx, cy), 4, (255, 0, 255), -1)

                # Check for left-to-right movement
                if cx1 < (cx + offset) and cx1 > (cx - offset):
                    cv2.rectangle(frame, (x3, y3), (x4, y4), (0, 255, 0), 2)
                    cvzone.putTextRect(frame, f'{id}', (x3, y3), 1, 2)
                    person_left[id] = (cx, cy)
                if id in person_left:
                    if cx2 < (cx + offset) and cx2 > (cx - offset):
                        cv2.rectangle(frame, (x3, y3), (x4, y4), (255, 0, 0), 2)
                        cvzone.putTextRect(frame, f'{id}', (x3, y3), 1, 2)
                        if counter_right.count(id) == 0:
                            counter_right.append(id)

                # Check for right-to-left movement
                if cx2 < (cx + offset) and cx2 > (cx - offset):
                    cv2.rectangle(frame, (x3, y3), (x4, y4), (0, 0, 255), 2)
                    cvzone.putTextRect(frame, f'{id}', (x3, y3), 1, 2)
                    person_right[id] = (cx, cy)
                if id in person_right:
                    if cx1 < (cx + offset) and cx1 > (cx - offset):
                        cv2.rectangle(frame, (x3, y3), (x4, y4), (255, 255, 0), 2)
                        cvzone.putTextRect(frame, f'{id}', (x3, y3), 1, 2)
                        if counter_left.count(id) == 0:
                            counter_left.append(id)

            # Draw vertical lines for tracking
            cv2.line(frame, (cx1, 3), (cx1, 637), (0, 255, 0), 2)
            cv2.line(frame, (cx2, 5), (cx2, 635), (0, 255, 255), 2)

            # Display counters
            left_count = len(counter_left)
            right_count = len(counter_right)

            current_date = datetime.now().strftime('%Y-%m-%d')
            current_time = datetime.now().strftime('%H:%M:%S')

            # Check if counts have changed since last frame
            if left_count != prev_left_count or right_count != prev_right_count:
                current_date = datetime.now().strftime('%Y-%m-%d')
                current_time = datetime.now().strftime('%H:%M:%S')

                # Insert data into MySQL only if there's a change
                try:
                    db = get_db_connection()  # Get a database connection
                    cursor_thread = db.cursor()
                    insert_query = "INSERT INTO video_data (`current_date`, `current_time`, `left_count`, `right_count`) VALUES (%s, %s, %s, %s)"
                    print("Executing SQL:", insert_query)
                    print("Data:", (current_date, current_time, left_count, right_count))
                    cursor_thread.execute(insert_query, (current_date, current_time, left_count, right_count))
                    db.commit()
                    cursor_thread.close()
                    db.close()
                except Exception as e:
                    print(f"Failed to insert data. Error: {e}")
                    raise

                # Update previous counts
                prev_left_count = left_count
                prev_right_count = right_count

            cvzone.putTextRect(frame, f'Left {left_count}', (50, 60), 2, 2)
            cvzone.putTextRect(frame, f'Right {right_count}', (50, 160), 2, 2)

            ret, buffer = cv2.imencode('.jpg', frame)
            if not ret:
                print("Failed to encode frame")
                continue

            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n\r\n')
    finally:
        cap.release()
        cv2.destroyAllWindows()

@app.get("/video_feed")
async def video_feed(user_agent: str = Header(None)):
    video_url = 'applesGoingRight.mp4'  # Set your video URL here
    return StreamingResponse(
        frame_generator(video_url),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

# ... (include other FastAPI endpoints and logic if necessary)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)