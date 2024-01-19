// import * as yup from "yup";

// export const validationSchema = yup.object({
//   // username: yup.string("Enter username").required("Please enter your username"),
//   tableNo: yup
//     .string("Enter Table Number")
//     .required("Table Number is required"),
//   workerName: yup
//     .string("Enter Worker Name")
//     .required("Worker Name is required"),
// });

import * as yup from "yup";

export const validationSchema = yup.object({
  tableNo: yup
    .string("Enter Table Number")
    .required("Table Number is required")
    .test(
      "is-valid-table-no",
      "Table Number must be between 1 and 40",
      function (value) {
        if (!value) return true; // If the field is empty, let other required validation handle it.
        const tableNo = parseInt(value);
        return tableNo >= 1 && tableNo <= 40;
      }
    ),
  workerName: yup
    .string("Enter Worker Name")
    .required("Worker Name is required"),
});
