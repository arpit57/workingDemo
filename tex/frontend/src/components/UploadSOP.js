import React, { useState } from "react";
import AWS from "aws-sdk";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Snackbar from "@mui/material/Snackbar";
import "../styles/upload-sop.scss";

function App() {
  const [files, setFiles] = useState([]);
  const [snackbar, setSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      project: "tex",
      language: "English",
    },

    onSubmit: async (values) => {
      try {
        if (files.length === 0) {
          alert("No files selected");
          return;
        }

        const s3 = new AWS.S3({
          accessKeyId: "AKIA2JOSUPLEXRL5CVTN",
          secretAccessKey: "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",
          region: "ap-south-1",
        });

        const locations = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const params = {
            Bucket: "alvision-sop-images",
            Key: `${values.project}/${values.language}/${file.name}`,
            Body: file,
          };

          // Upload the file to S3 and wait for the promise to resolve
          const data = await s3.upload(params).promise();

          // Push the S3 location to the locations array
          locations.push(data.Location);
        }

        const res = await axios.put("http://localhost:9000/sop", {
          project: values.project,
          language: values.language,
          images: locations,
        });

        if (res.data.message === "Successfully uploaded") {
          setSnackbar(true);
        }

        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
      } catch (err) {
        console.error("Error uploading files:", err);
      }
    },
  });

  return (
    <div className="upload-sop">
      <div className="container">
        <form action="" onSubmit={formik.handleSubmit}>
          <TextField
            select
            margin="dense"
            variant="outlined"
            fullWidth
            id="project"
            name="project"
            label="Project"
            defaultValue="tex"
            onChange={formik.handleChange}
            sx={{ marginBottom: "10px" }}
          >
            <MenuItem value="tex">AlVision | TEX</MenuItem>
          </TextField>

          <TextField
            select
            margin="dense"
            variant="outlined"
            fullWidth
            id="language"
            name="language"
            label="Language"
            defaultValue="English"
            onChange={formik.handleChange}
            sx={{ marginBottom: "10px" }}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
          </TextField>

          <div className="label-container">
            <AddPhotoAlternateIcon
              style={{ width: "30px", height: "30px", color: "#bf3c3b" }}
            />
            <label htmlFor="file-input" className="file-input-label">
              Choose Images
            </label>
            <input
              id="file-input"
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>

          <button type="submit">Upload</button>
        </form>
      </div>
      <Snackbar
        open={snackbar}
        message="Successfully uploaded!"
        sx={{
          left: "auto !important",
          right: "24px !important",
        }}
      />
    </div>
  );
}

export default App;
