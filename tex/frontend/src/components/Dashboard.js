import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../styles/dashboard.scss";
import Overview from "./dashboardComponents/Overview";
import MachineUtilisation from "./dashboardComponents/MachineUtilisation";
import MachineData from "./dashboardComponents/MachineData";
import Throughput from "./dashboardComponents/Throughput";
import ShareCapacity from "./dashboardComponents/ShareCapacity";
import EnvironmentBenefits from "./dashboardComponents/EnvironmentBenefits";
import CycleTimeTrend from "./dashboardComponents/CycleTimeTrend";

function Dashboard(props) {
  return (
    <>
      <Container fluid className="dashboard">
        <Row className="dashboard-row">
          <Col
            xs={12}
            lg={6}
            className="dashboard-col"
            style={{ display: "flex" }}
          >
            <Overview date={props.date} style={{ flex: 1 }} />
          </Col>
          <Col xs={12} lg={6} className="dashboard-col">
    <img src='http://127.0.0.1:8000/video_feed' />
            
          </Col>
        </Row>
      </Container>

         <Container fluid className="dashboard">
        <Row className="dashboard-row">
          <Col xs={12} lg={12} className="dashboard-col">
          <MachineData date={props.date} />
          </Col>
        </Row>
      </Container>

      {/* <Container fluid className="dashboard">
        <Row className="dashboard-row">
          <Col xs={12} lg={12} className="dashboard-col">
            <MachineUtilisation date={props.date} />
          </Col>
        </Row>
      </Container> */}

      <Container fluid className="dashboard">
        <Row className="dashboard-row">
          <Col className="dashboard-col">
            <Throughput date={props.date} />
          </Col>
        </Row>
      </Container>

      {/* <Container fluid className="dashboard">
        <Row className="dashboard-row">
          <Col xs={12} className="dashboard-col">
            <CycleTimeTrend date={props.date} />
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default Dashboard;
