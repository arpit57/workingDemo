import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { IconButton } from "@mui/material";
import axios from "axios";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import GroupsIcon from "@mui/icons-material/Groups";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import TimelineIcon from "@mui/icons-material/Timeline";

function Overview(props) {
  const [count, setCount] = useState();

  useEffect(() => {
    async function getData() {
      
        const res = await axios(
          `http://127.0.0.1:8000/date/day_count?date=${props.date}`
        );
        setCount(res.data[0].count)
     
    }

    getData();
  }, [props.date]);

  return (
    <div className="chart column-chart" style={{ width: "100%" }}>
      <h3>Welcome, Shahi Exports</h3>
      <p>Welcome back to ALVision Tex</p>
      <Row>
        <Col xs={6} style={{ padding: 0 }}>
          <div
            style={{
              border: "1px solid #000",
              margin: "5px",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton>
                <div>
                  <SettingsSuggestIcon />
                </div>
              </IconButton>
              <div>40</div>
            </div>
            <div style={{ textAlign: "center" }}>Machine Count</div>
          </div>
        </Col>

        <Col xs={6} style={{ padding: 0 }}>
          <div
            style={{
              border: "1px solid #000",
              margin: "5px",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton>
                <div>
                  <GroupsIcon />
                </div>
              </IconButton>
              <div>40</div>
            </div>
            <div style={{ textAlign: "center" }}>Worker Count</div>
          </div>
        </Col>

        <Col xs={6} style={{ padding: 0 }}>
          <div
            style={{
              border: "1px solid #000",
              margin: "5px",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton>
                <div>
                  <VideoCameraBackIcon />
                </div>
              </IconButton>
              <div>40</div>
            </div>
            <div style={{ textAlign: "center" }}>Camera Count</div>
          </div>
        </Col>

        <Col xs={6} style={{ padding: 0 }}>
          <div
            style={{
              border: "1px solid #000",
              margin: "5px",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton>
                <div>
                  <TimelineIcon />
                </div>
              </IconButton>
              <div>{count}</div>
            </div>
            <div style={{ textAlign: "center" }}>Production Count</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Overview;
