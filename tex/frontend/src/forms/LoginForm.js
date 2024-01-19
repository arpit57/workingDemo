import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { validationSchema } from "../schemas/LoginSchema";
import { UserContext } from "../contexts/UserContext";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.password === "TEXUSER") {
        localStorage.setItem("texUser", true);
        setUser(true);
      } else {
        alert("Wrong Password");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        type="password"
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <Button fullWidth type="submit" className="submit-form-btn">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
