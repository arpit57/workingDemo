import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { IconButton, MenuItem, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { sopEnglish, sopHindi } from "../assets/data/sop";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";

function SOP() {
  const [language, setLanguage] = useState("English");
  const [data, setData] = useState([]);
  const sop = language === "English" ? sopEnglish : sopHindi;
  useEffect(() => {
    setData([]);
    async function getSOP() {
      const response = await axios(`http://localhost:9000/sop/tex/${language}`);
      console.log(response.data);
      setData(response.data.images);
    }
    getSOP();
  }, [language]);

  const downloadAllSOP = async () => {
    try {
      const response = await fetch("/sop/hindi/all_hindi_1.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      let aTag = document.createElement("a");
      aTag.href = url;
      aTag.download = `All SOPs (Hindi).pdf`;
      aTag.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <TextField
            select
            size="large"
            margin="normal"
            variant="outlined"
            label="Select Language"
            sx={{ width: 300 }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="English">English</MenuItem>

            <MenuItem value="Hindi">Hindi</MenuItem>
          </TextField>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <h5>Downlaod All SOPs</h5>
          <Tooltip title="Download All SOPs">
            <IconButton onClick={downloadAllSOP}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Row style={{ marginTop: "20px" }}>
        {data.map((sop) => {
          return (
            <Col
              key={sop}
              xs={4}
              style={{
                marginBottom: "30px",
                height: "450px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ height: "100%", overflow: "visible" }}>
                <a href={sop}>
                  <img
                    src={sop}
                    alt=""
                    width="350px"
                    height="450px"
                    style={{
                      boxShadow: "2px 2px 50px 10px rgba(0, 0, 0, 0.05)",
                      cursor: "pointer",
                    }}
                  />
                </a>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default SOP;
