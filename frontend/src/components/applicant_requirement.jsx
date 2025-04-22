import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplicantRequirement = () => {
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const res = await axios.get("http://localhost:5000/applicant-requirements");
        setRequirements(res.data);
      } catch (error) {
        console.error("Error fetching requirements:", error);
      }
    };
    fetchRequirements();
  }, []);

  return (
    <div>
      <h2>Applicant Requirements</h2>
      <h3>Uploaded Documents</h3>
      <ul>
        {requirements.map((req) => (
          <li key={req.id}>
            <strong>{req.title}</strong> - {req.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicantRequirement;
