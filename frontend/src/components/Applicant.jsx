import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplicantForm = () => {
  const [formData, setFormData] = useState({
    campus: "",
    academicProgram: "",
    classifiedAs: "",
    program: "",
    yearLevel: "",
    lastName: "",
    firstName: "",
    middleName: "",
    extension: "",
    nickname: "",
    height: "",
    weight: "",
    lrnNumber: "",
    gender: "",
    birthOfDate: "",
    age: "",
    birthPlace: "",
    languageDialectSpoken: "",
    citizenship: "",
    religion: "",
    civilStatus: "",
    tribeEthnicGroup: "",
    cellphoneNumber: "",
    emailAddress: "",
    telephoneNumber: "",
    facebookAccount: "",
    presentAddress: "",
    permanentAddress: "",
    street: "",
    barangay: "",
    zipCode: "",
    region: "",
    province: "",
    municipality: "",
    dswdHouseholdNumber: ""
  });

  const [applicants, setApplicants] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/applicants");
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching applicants", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/applicants/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:5000/applicants", formData);
      }
      fetchApplicants();
      setFormData({
        campus: "",
        academicProgram: "",
        classifiedAs: "",
        program: "",
        yearLevel: "",
        lastName: "",
        firstName: "",
        middleName: "",
        extension: "",
        nickname: "",
        height: "",
        weight: "",
        lrnNumber: "",
        gender: "",
        birthOfDate: "",
        age: "",
        birthPlace: "",
        languageDialectSpoken: "",
        citizenship: "",
        religion: "",
        civilStatus: "",
        tribeEthnicGroup: "",
        cellphoneNumber: "",
        emailAddress: "",
        telephoneNumber: "",
        facebookAccount: "",
        presentAddress: "",
        permanentAddress: "",
        street: "",
        barangay: "",
        zipCode: "",
        region: "",
        province: "",
        municipality: "",
        dswdHouseholdNumber: ""
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving applicant", error);
    }
  };

  const handleEdit = (applicant) => {
    setFormData(applicant);
    setEditingId(applicant.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/applicants/${id}`);
      fetchApplicants();
    } catch (error) {
      console.error("Error deleting applicant", error);
    }
  };

  return (
    <div>
      <h2>Applicant Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key.replace(/([A-Z])/g, " $1").toUpperCase()}
            value={formData[key]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit">{editingId ? "Update" : "Add"} Applicant</button>
      </form>
      <h2>Applicants List</h2>
      <ul>
        {applicants.map((applicant) => (
          <li key={applicant.id}>
            {Object.values(applicant).join(" - ")}
            <button onClick={() => handleEdit(applicant)}>Edit</button>
            <button onClick={() => handleDelete(applicant.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicantForm;
