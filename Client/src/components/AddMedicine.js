import React, { useState } from "react";
import axios from "axios";
import "./AddMedicine.css";


export default function AddMedicine() {
  const [medicineName, setMedicineName] = useState("");
  const [packing, setPacking] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [mrp, setMRP] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!medicineName) {
      formIsValid = false;
      errors["medicineName"] = "Medicine name cannot be empty";
    }

    if (!packing) {
      formIsValid = false;
      errors["packing"] = "Packing cannot be empty";
    }

    if (!expiryDate) {
      formIsValid = false;
      errors["expiryDate"] = "Expiry date cannot be empty";
    }

    if (!mrp) {
      formIsValid = false;
      errors["mrp"] = "MRP cannot be empty";
    } else if (!/^\d+(\.\d{1,2})?$/.test(mrp)) {
      formIsValid = false;
      errors["mrp"] = "MRP should be a valid number with up to 2 decimal places";
    }

    setErrors(errors);
    return formIsValid;
  }

  function sendData(event) {
    event.preventDefault();

    if (validateForm()) {
      const newMedicine = {
        medicineName,
        packing,
        expiryDate,
        mrp,
      };
      console.log(newMedicine);

      axios
        .post("http://localhost:8070/medicine/add", newMedicine)
        .then(() => {
          alert("Medicine Added");
          setMedicineName("");
          setPacking("");
          setExpiryDate("");
          setMRP("");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="container">
       <div className="page-header">
       <div className="text-center pt-5">
        <h1>Add Medicine</h1>
      </div>
      </div>
      
      <form onSubmit={sendData}>
        <div className="row">
          <div className="col-md-6 form-group">
            <label className="font-weight-bold" htmlFor="medicineName">
              Medicine Name:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors["medicineName"] ? "is-invalid" : ""
              }`}
              id="medicineName"
              placeholder="Medicine Name"
              value={medicineName}
              onChange={(event) => {
                setMedicineName(event.target.value);
              }}
            />
            {errors["medicineName"] && (
              <div className="invalid-feedback">{errors["medicineName"]}</div>
            )}
          </div>
          <div className="col-md-6 form-group">
            <label className="font-weight-bold" htmlFor="packing">
              Packing:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors["packing"] ? "is-invalid" : ""
              }`}
              id="packing"
              placeholder="Packing e.g. 10"
              value={packing}
              onChange={(event) => {
                setPacking(event.target.value);
              }}
            />
            {errors["packing"] && (
              <div className="invalid-feedback">{errors["packing"]}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 form-group">
            <label className="font-weight-bold" htmlFor="expiryDate">
              Expiry Date:
            </label>
            <input
              type="date"
              className={`form-control ${
                errors["expiryDate"] ? "is-invalid" : ""
              }`}
              id="expiryDate"
              placeholder="Expiry Date"
              value={expiryDate}
              onChange={(event) => {
                setExpiryDate(event.target.value);
              }}
            />
            {errors["expiryDate"] && (
              <div className="invalid-feedback">{errors["expiryDate"]}</div>
            )}
          </div>
          <div className="col-md-6 form-group">
            <label className="font-weight-bold" htmlFor="mrp">
              MRP:
            </label>
            <input
              type="text"
              className={`form-control ${errors["mrp"] ? "is-invalid" : ""}`}
              id="mrp"
              placeholder="MRP e.g. 25.50"
              value={mrp}
              onChange={(event) => {
                setMRP(event.target.value);
              }}
            />
            {errors["mrp"] && (
              <div className="invalid-feedback">{errors["mrp"]}</div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Medicine
        </button>
      </form>
    </div>
);
}    

   