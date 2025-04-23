import React, { useEffect, useState } from "react";
import axios from "axios";

const SemesterPanel = () => {
    const [semesterDescription, setSemesterDescription] = useState("");
    const [semesters, setSemesters] = useState([]);

    // Load semesters from backend
    const fetchSemesters = async () => {
        try {
            const res = await axios.get("http://localhost:5000/semester_table");
            setSemesters(res.data);
        } catch (error) {
            console.error("Error fetching semesters:", error);
        }
    };

    useEffect(() => {
        fetchSemesters();
    }, []);

    // Add a new semester
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!semesterDescription.trim()) return;

        try {
            await axios.post("http://localhost:5000/semesters", {
                semester_description: semesterDescription,
            });
            setSemesterDescription("");
            fetchSemesters();
        } catch (error) {
            console.error("Error saving semester:", error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Semester Panel</h2>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={semesterDescription}
                    onChange={(e) => setSemesterDescription(e.target.value)}
                    placeholder="Enter semester (e.g., First Semester)"
                    className="border p-2 flex-grow rounded"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save
                </button>
            </form>
            <h3 className="font-semibold mb-2">Saved Semesters:</h3>
            <ul className="list-disc pl-5">
                {semesters.map((semester) => (
                    <li key={semester.semester_id}>
                        {semester.semester_description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SemesterPanel;
