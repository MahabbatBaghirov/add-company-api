import React from "react";
import { useFormik } from 'formik';
import { Button, TextField } from "@mui/material";
import { CompanySchema } from "../validation/CompanyValidation";
import Swal from "sweetalert2";
import { postCompany } from "../api/companyRequsts";

const AddArtist = () => {
  function handleSubmit(values, actions) {
    console.log('values',values);
    postCompany(values)
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    actions.resetForm();
  }
  const formik = useFormik({
    initialValues: {
      companyName: "",
      contactName: "",
      contactTitle: "",
    },
    validationSchema: CompanySchema,
    onSubmit: handleSubmit,
  });
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "30px",
          border: "1px solid #eee",
          width: "50%",
          height: "400px",
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          style={{ marginBottom: "7px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="companyName"
          type="text"
          id="outlined-basic"
          value={formik.values.companyName}
          label="Company Name"
          variant="outlined"
          error={formik.errors.name && formik.touched.name ? true : false}
        />
        {formik.errors.companyName && formik.touched.companyName && <p style={{color:'red'}}>{formik.errors.companyName}</p>}
        <TextField
          style={{ marginBottom: "7px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="contactName"
          type="text"
          value={formik.values.age}
          error={formik.errors.age && formik.touched.age ? true : false}
          id="outlined-basic"
          label="Contact Name"
          variant="outlined"
        />
         {formik.errors.contactName && formik.touched.contactName && <p style={{color:'red'}}>{formik.errors.contactName}</p>}
        <TextField
          style={{ marginBottom: "7px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.contactTitle}
          error={formik.errors.contactTitle && formik.touched.contactTitle ? true : false}
          name="contactTitle"
          type="text"
          id="outlined-basic"
          label="Contact Title"
          variant="outlined"
        />
         {formik.errors.contactTitle && formik.touched.contactTitle && <p style={{color:'red'}}>{formik.errors.contactTitle}</p>}

        <Button
          style={{ display: "block", margin: "10px auto" }}
          type="submit"
          variant="contained"
          color="warning"
        >
          Add Company
        </Button>
      </form>
    </div>
  );
};

export default AddArtist;
