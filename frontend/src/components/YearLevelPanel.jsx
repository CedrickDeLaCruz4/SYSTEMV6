import React, { useEffect, useState } from "react";
import axios from "axios";

const YearLevelPanel = () => {
    const [yearLevelDescription, setYearLevelDescription] = useState("");
    const [yearLevels, setYearLevels] = useState([]);

    // Load year levels from the backend
    const fetchYearLevels = async () => {
        try {
            const res = await axios.get("http://localhost:5000/year_level_table");
            setYearLevels(res.data); // Assuming the response is an array of year levels
        } catch (error) {
            console.error("Error fetching year levels:", error);
        }
    };

    useEffect(() => {
        fetchYearLevels();
    }, []);

    // Add a new year level
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!yearLevelDescription.trim()) return;

        try {
            await axios.post("http://localhost:5000/years_level", {
                year_level_description: yearLevelDescription,
            });
            setYearLevelDescription(""); // Clear the input
            fetchYearLevels(); // Refresh the list of year levels
        } catch (error) {
            console.error("Error saving year level:", error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Year Level Panel</h2>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={yearLevelDescription}
                    onChange={(e) => setYearLevelDescription(e.target.value)}
                    placeholder="Enter year level (e.g., First Year)"
                    className="border p-2 flex-grow rounded"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save
                </button>
            </form>
            <h3 className="font-semibold mb-2">Saved Year Levels:</h3>
            <ul className="list-disc pl-5">
                {yearLevels.map((level) => (
                    <li key={level.year_level_id}>
                        {level.year_level_description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YearLevelPanel;
