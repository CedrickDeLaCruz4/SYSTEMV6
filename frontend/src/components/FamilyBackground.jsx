import React, { useState, useEffect } from "react";
import axios from "axios";

const FamilyBackgroundForm = () => {
  const [formData, setFormData] = useState({
    solo_parent: "",
    father_deceased: "",
    father_family_name: "",
    father_given_name: "",
    father_middle_name: "",
    father_ext: "",
    father_nickname: "",
    father_education_level: "",
    father_last_school: "",
    father_course: "",
    father_year_graduated: "",
    father_contact: "",
    father_occupation: "",
    father_employer: "",
    father_income: "",
    father_email: "",
    mother_deceased: "",
    mother_family_name: "",
    mother_given_name: "",
    mother_middle_name: "",
    mother_nickname: "",
    mother_education_level: "",
    mother_school_address: "",
    mother_course: "",
    mother_year_graduated: "",
    mother_contact: "",
    mother_occupation: "",
    mother_employer: "",
    mother_income: "",
    mother_email: ""
  });

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/family_background");
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/family_background/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:5000/family_background", formData);
      }
      fetchRecords();
      setFormData({
        solo_parent: "",
        father_deceased: "",
        father_family_name: "",
        father_given_name: "",
        father_middle_name: "",
        father_ext: "",
        father_nickname: "",
        father_education_level: "",
        father_last_school: "",
        father_course: "",
        father_year_graduated: "",
        father_contact: "",
        father_occupation: "",
        father_employer: "",
        father_income: "",
        father_email: "",
        mother_deceased: "",
        mother_family_name: "",
        mother_given_name: "",
        mother_middle_name: "",
        mother_nickname: "",
        mother_education_level: "",
        mother_school_address: "",
        mother_course: "",
        mother_year_graduated: "",
        mother_contact: "",
        mother_occupation: "",
        mother_employer: "",
        mother_income: "",
        mother_email: ""
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving record", error);
    }
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditingId(record.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/family_background/${id}`);
      fetchRecords();
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };

  return (
    <div>
      <h2>Family Background Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key.replace(/_/g, " ").toUpperCase()}
            value={formData[key]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit">{editingId ? "Update" : "Add"} Record</button>
      </form>
      <h2>Records List</h2>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {Object.values(record).join(" - ")}
            <button onClick={() => handleEdit(record)}>Edit</button>
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FamilyBackgroundForm;
