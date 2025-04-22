import React, { useState } from "react";
import axios from "axios";

const AdmForm = ({ onUploadSuccess }) => {
    const [formData, setFormData] = useState({ requirementId: "", file: null });

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleUpload = async () => {
        if (!formData.requirementId || !formData.file) {
            alert("Please select a requirement and upload a file.");
            return;
        }

        const data = new FormData();
        data.append("requirementId", formData.requirementId);
        data.append("file", formData.file);

        try {
            await axios.post("http://localhost:5000/upload", data);
            alert("File uploaded successfully!");
            if (onUploadSuccess) {
                onUploadSuccess(); // Notify parent component to refresh
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed");
        }
    };

    return (
        <div>
            <h3>Upload Documents</h3>
            <select onChange={(e) => setFormData({ ...formData, requirementId: e.target.value })}>
                <option value="">Select Requirement</option>
                <option value="1">High School Report Card</option>
                <option value="2">Certificate of Good Moral Character</option>
                <option value="3">NSO Birth Certificate</option>
                <option value="4">1x1 Picture (White Background)</option>
                <option value="5">Certification from School Principal</option>
                <option value="6">Notarized Affidavit</option>
            </select>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default AdmForm;
