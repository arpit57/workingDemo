import cv2
import pandas as pd
from ultralytics import YOLO
from tracker import Tracker
import cvzone

model = YOLO('appleDetection.pt')

def RGB(event, x, y, flags, param):
    if event == cv2.EVENT_MOUSEMOVE:
        point = [x, y]
        print(point)

cv2.namedWindow('RGB')
cv2.setMouseCallback('RGB', RGB)
cap = cv2.VideoCapture('applesGoingRight.mp4')

# Initialize VideoWriter
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
output = cv2.VideoWriter('output4.mp4', fourcc, 20.0, (640, 640))

my_file = open("coco.txt", "r")
data = my_file.read()
class_list = data.split("\n")

count = 0
person_left = {}
person_right = {}
tracker = Tracker()
counter_left = []
counter_right = []
cx1 = 200  # Define vertical line for left-to-right movement
cx2 = 230  # Define vertical line for right-to-left movement
offset = 10

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.resize(frame, (640, 640))

    results = model.predict(frame, conf=0.1, iou=0.5)
    a = results[0].boxes.data
    px = pd.DataFrame(a.cpu()).astype("float")
    list = []

    for index, row in px.iterrows():
        x1 = int(row[0])
        y1 = int(row[1])
        x2 = int(row[2])
        y2 = int(row[3])
        d = int(row[5])

        c = class_list[d]
        if 'person' in c:
            list.append([x1, y1, x2, y2])

    bbox_id = tracker.update(list)
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
    cvzone.putTextRect(frame, f'Left {left_count}', (50, 60), 2, 2)
    cvzone.putTextRect(frame, f'Right {right_count}', (50, 160), 2, 2)

    # Save and show frame
    output.write(frame)

cap.release()
output.release()
cv2.destroyAllWindows()