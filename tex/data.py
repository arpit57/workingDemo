from fastapi import FastAPI, Query , APIRouter
from databases import Database
from fastapi.middleware.cors import CORSMiddleware

# Database Configuration
DATABASE_URL = "mysql://root:root@localhost:3306/tex"  # Update with your MySQL Docker instance details
database = Database(DATABASE_URL)

# FastAPI app
# app = FastAPI()


approuter = APIRouter(prefix="/date")


@approuter.get("/day_count")
async def read_video_data(date: str = Query(None, description="Enter the date in YYYY-MM-DD format")):
    # SQL SELECT query
    query = f"SELECT count(cycle_count) as count FROM video_data where `current_date` = :date"
    return await database.fetch_all(query, values={"date": date})


@approuter.get("/month_count")
async def read_monthly_data(year: int):
    # SQL query to create a series of all months and left join with your data, filtered by the specified year
    query = f"""
    SELECT LPAD(cast(m.month as char), 2, '0') as month, 
           COALESCE(vd.count, 0) as count 
    FROM (
        SELECT 1 as month
        UNION SELECT 2
        UNION SELECT 3
        UNION SELECT 4
        UNION SELECT 5
        UNION SELECT 6
        UNION SELECT 7
        UNION SELECT 8
        UNION SELECT 9
        UNION SELECT 10
        UNION SELECT 11
        UNION SELECT 12
    ) m
    LEFT JOIN (
        SELECT MONTH(`current_date`) as month, 
               COUNT(cycle_count) as count 
        FROM video_data 
        WHERE YEAR(`current_date`) = {year}
        GROUP BY MONTH(`current_date`)
    ) vd ON m.month = vd.month
    """
    result = await database.fetch_all(query)

    # Formatting the result as a list of dictionaries
    formatted_result = [{"month": row['month'], "count": row['count']} for row in result]
    return formatted_result


@approuter.get("/hour_count")
async def read_hourly_data(date: str = Query(..., description="Enter the date in YYYY-MM-DD format")):
    # SQL query to create a series of all hours and left join with your data
    query = """
    SELECT LPAD(cast(h.hour as char), 2, '0') as hour, 
           COALESCE(vd.count, 0) as count 
    FROM (
        SELECT 0 as hour
        UNION SELECT 1
        UNION SELECT 2
        UNION SELECT 3
        UNION SELECT 4
        UNION SELECT 5
        UNION SELECT 6
        UNION SELECT 7
        UNION SELECT 8
        UNION SELECT 9
        UNION SELECT 10
        UNION SELECT 11
        UNION SELECT 12
        UNION SELECT 13
        UNION SELECT 14
        UNION SELECT 15
        UNION SELECT 16
        UNION SELECT 17
        UNION SELECT 18
        UNION SELECT 19
        UNION SELECT 20
        UNION SELECT 21
        UNION SELECT 22
        UNION SELECT 23
    ) h
    LEFT JOIN (
        SELECT HOUR(`current_time`) as hour, 
               COUNT(cycle_count) as count 
        FROM video_data 
        WHERE DATE(`current_date`) = :date
        GROUP BY HOUR(`current_time`)
    ) vd ON h.hour = vd.hour
    """
    result = await database.fetch_all(query, values={"date": date})

    # Formatting the result as a list of dictionaries
    formatted_result = [{"hour_range": row['hour'], "count": row['count']} for row in result]
    return formatted_result

