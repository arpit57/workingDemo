import React from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";

function BulletinForm() {
  const formik = useFormik({
    initialValues: {
      document_title: "",
      document_code: "",
      revision_level: "",
      document_version: "",
    },
    // validationSchema:validationSchema,
    onSubmit: async (values) => {},
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          size="large"
          margin="normal"
          variant="outlined"
          id="document_title"
          name="document_title"
          label="Document Title"
          value={formik.values.document_title}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          size="large"
          margin="normal"
          variant="outlined"
          id="document_code"
          name="document_code"
          label="Document Code"
          value={formik.values.document_code}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          size="large"
          margin="normal"
          variant="outlined"
          id="revision_level"
          name="revision_level"
          label="Revision Level"
          value={formik.values.revision_level}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          size="large"
          margin="normal"
          variant="outlined"
          id="document_version"
          name="document_version"
          label="Document Version"
          value={formik.values.document_version}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          size="large"
          margin="normal"
          variant="outlined"
          id="document_title"
          name="document_title"
          label="Document Title"
          value={formik.values.document_title}
          onChange={formik.handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BulletinForm;
