import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const EmployeeForm = ({ data, setData, id, setId, isUpdate, setIsUpdate }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First Name must be at least 2 characters")
        .required("First Name is required"),
      lastName: Yup.string()
        .min(2, "Last Name must be at least 2 characters")
        .required("Last Name is required"),
      age: Yup.number()
        .min(18, "Age must be at least 18")
        .required("Age is required"),
    }),
    onSubmit: (values) => {
      if (isUpdate) {
        const updatedData = data.map((employee) =>
          employee.id === id ? { ...employee, ...values } : employee
        );
        setData(updatedData);
        handleClear();
      } else {
        const newObject = {
          id: data.length + 1,
          ...values,
        };
        setData([...data, newObject]);
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (isUpdate) {
      const employeeToEdit = data.find((employee) => employee.id === id);
      if (employeeToEdit) {
        formik.setValues({
          firstName: employeeToEdit.firstName,
          lastName: employeeToEdit.lastName,
          age: employeeToEdit.age,
        });
      }
    }
  }, [id, isUpdate, data]);

  const handleClear = () => {
    setId(null);
    formik.resetForm();
    setIsUpdate(false);
  };


  const styles = {
    form: {
      maxWidth: "400px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f9f9f9",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    error: {
      color: "red",
      fontSize: "0.9em",
      marginTop: "5px",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "10px",
    },
    clearButton: {
      padding: "10px 15px",
      backgroundColor: "#cccccc",
      color: "#333",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <form style={styles.form} onSubmit={formik.handleSubmit}>
      <div style={styles.formGroup}>
        <label style={styles.label}>
          First Name:
          <input
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            style={styles.input}
            className={formik.touched.firstName && formik.errors.firstName ? "error" : ""}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div style={styles.error}>{formik.errors.firstName}</div>
          ) : null}
        </label>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            style={styles.input}
            className={formik.touched.lastName && formik.errors.lastName ? "error" : ""}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div style={styles.error}>{formik.errors.lastName}</div>
          ) : null}
        </label>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>
          Age:
          <input
            type="number"
            name="age"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            style={styles.input}
            className={formik.touched.age && formik.errors.age ? "error" : ""}
          />
          {formik.touched.age && formik.errors.age ? (
            <div style={styles.error}>{formik.errors.age}</div>
          ) : null}
        </label>
      </div>
      <button
        type="submit"
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
      >
        {isUpdate ? "Update" : "Add"} Employee
      </button>
      <button
        type="button"
        style={styles.clearButton}
        onClick={handleClear}
      >
        Clear
      </button>
    </form>
  );
};

export default EmployeeForm;
