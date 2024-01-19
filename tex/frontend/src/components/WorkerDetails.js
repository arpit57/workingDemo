import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import axios from "axios";
import { validationSchema } from "../schemas/WorkerDetailsSchema";

function WorkerDetails() {
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      tableNo: "",
      workerName: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = { source_id: id, ...values };
      console.log(data);
      const res = await axios.post(
        `http://127.0.0.1:8000/worker_details`,
        data
      );
      console.log(res);
    },
  });

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: "50%", margin: "auto" }}
      >
        <h5 style={{ textAlign: "center" }}>Camera Number: {id}</h5>
        <TextField
          size="small"
          margin="dense"
          variant="filled"
          fullWidth
          id="tableNo"
          name="tableNo"
          label="Table Number"
          value={formik.values.tableNo}
          onChange={formik.handleChange}
          error={formik.touched.tableNo && Boolean(formik.errors.tableNo)}
          helperText={formik.touched.tableNo && formik.errors.tableNo}
        />

        <TextField
          size="small"
          margin="dense"
          variant="filled"
          fullWidth
          id="workerName"
          name="workerName"
          label="Worker Name"
          value={formik.values.workerName}
          onChange={formik.handleChange}
          error={formik.touched.workerName && Boolean(formik.errors.workerName)}
          helperText={formik.touched.workerName && formik.errors.workerName}
        />

        <Button
          fullWidth
          type="submit"
          style={{
            backgroundColor: "#273041",
            padding: "10px",
            color: "#fff",
            border: "none",
            outline: "none",
            float: "right",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default WorkerDetails;
