import React, { useEffect, useState } from "react";
import axios from "axios";

const YearPanel = () => {
    const [yearDescription, setYearDescription] = useState("");
    const [years, setYears] = useState([]);

    // Load years from backend
    const fetchYears = async () => {
        try {
            const res = await axios.get("http://localhost:5000/year_table");
            setYears(res.data);
        } catch (error) {
            console.error("Error fetching years:", error);
        }
    };

    useEffect(() => {
        fetchYears();
    }, []);

    // Add a new year
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!yearDescription.trim()) return;

        try {
            await axios.post("http://localhost:5000/years", {
                year_description: yearDescription
            });
            setYearDescription(""); // Clear the input
            fetchYears(); // Refresh the list
        } catch (error) {
            console.error("Error saving year:", error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Year Panel</h2>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={yearDescription}
                    onChange={(e) => setYearDescription(e.target.value)}
                    placeholder="Enter year (e.g., 2026)"
                    className="border p-2 flex-grow rounded"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save
                </button>
            </form>
            <h3 className="font-semibold mb-2">Saved Years:</h3>
            <ul className="list-disc pl-5">
                {years.map((year) => (
                    <li key={year.year_id}>
                        {year.year_description} {year.status === 1 ? "(Active)" : ""}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YearPanel;
