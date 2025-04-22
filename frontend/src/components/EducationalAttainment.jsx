import React, { useState, useEffect } from "react";
import axios from "axios";

const EducationalAttainmentForm = () => {
  const [formData, setFormData] = useState({
    schoolLevel: "",
    schoolLastAttended: "",
    schoolAddress: "",
    courseProgram: "",
    honor: "",
    generalAverage: "",
    yearGraduated: "",
    strand: ""
  });

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/educational_attainment");
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
        await axios.put(`http://localhost:5000/educational_attainment/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:5000/educational_attainment", formData);
      }
      fetchRecords();
      setFormData({
        schoolLevel: "",
        schoolLastAttended: "",
        schoolAddress: "",
        courseProgram: "",
        honor: "",
        generalAverage: "",
        yearGraduated: "",
        strand: ""
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
      await axios.delete(`http://localhost:5000/educational_attainment/${id}`);
      fetchRecords();
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };

  return (
    <div>
      <h2>Educational Attainment Form</h2>
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

export default EducationalAttainmentForm;
