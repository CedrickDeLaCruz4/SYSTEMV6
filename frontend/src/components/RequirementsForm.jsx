import React, { useState, useEffect } from "react";
import axios from "axios";

const RequirementsForm = () => {
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]);

  // Fetch requirements on load
  const fetchRequirements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/requirements");
      setRequirements(res.data);
    } catch (err) {
      console.error("Error fetching requirements:", err);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  // Save requirement
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      await axios.post("http://localhost:5000/requirements", {
        requirements_description: description,
      });
      setDescription(""); // Clear input
      fetchRequirements(); // Refresh list
    } catch (err) {
      console.error("Error saving requirement:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add Requirement</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter requirement description"
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Saved Requirements</h3>
      <ul className="list-disc pl-6">
        {requirements.map((req) => (
          <li key={req.requirements_id}>{req.requirements_description}</li>
        ))}
      </ul>
    </div>
  );
};

export default RequirementsForm;
