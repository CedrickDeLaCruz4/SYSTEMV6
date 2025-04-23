import React, { useEffect, useState } from "react";
import axios from "axios";

const SchoolYearPanel = () => {
    const [years, setYears] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [schoolYears, setSchoolYears] = useState([]);

    const fetchYears = async () => {
        try {
            const res = await axios.get("http://localhost:5000/year_table");
            setYears(res.data);
        } catch (error) {
            console.error("Error fetching years:", error);
        }
    };

    const fetchSemesters = async () => {
        try {
            const res = await axios.get("http://localhost:5000/semester_table");
            setSemesters(res.data);
        } catch (error) {
            console.error("Error fetching semesters:", error);
        }
    };

    const fetchSchoolYears = async () => {
        try {
            const res = await axios.get("http://localhost:5000/school_years");
            setSchoolYears(res.data);
        } catch (error) {
            console.error("Error fetching school years:", error);
        }
    };

    useEffect(() => {
        fetchYears();
        fetchSemesters();
        fetchSchoolYears();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedYear || !selectedSemester) return;

        try {
            await axios.post("http://localhost:5000/school_years", {
                year_level_id: selectedYear,
                semester_id: selectedSemester,
                activator: 0, // Always set to inactive
            });
            setSelectedYear("");
            setSelectedSemester("");
            fetchSchoolYears();
        } catch (error) {
            console.error("Error saving school year:", error);
        }
    };

    const formatYearRange = (year) => {
        const start = parseInt(year.year_description);
        return `${start}-${start + 1}`;
    };

    const getStatus = (activatorValue) => {
        return activatorValue === 1 ? "Active" : "Inactive";
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">School Year Panel</h2>
            <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
                <div>
                    <label className="block font-semibold">Year Level</label>
                    <select
                        className="border p-2 w-full rounded"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">-- Select Year Level --</option>
                        {years.map((year) => (
                            <option key={year.year_id} value={year.year_id}>
                                {formatYearRange(year)}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">Semester</label>
                    <select
                        className="border p-2 w-full rounded"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                    >
                        <option value="">-- Select Semester --</option>
                        {semesters.map((semester) => (
                            <option key={semester.semester_id} value={semester.semester_id}>
                                {semester.semester_description}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save
                </button>
            </form>

            <h3 className="text-lg font-semibold mb-2">Saved School Years:</h3>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Year Level</th>
                        <th className="p-2 border">Semester</th>
                        <th className="p-2 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {schoolYears.map((sy, index) => (
                        <tr key={index}>
                            <td className="p-2 border">{`${sy.year_description}-${parseInt(sy.year_description) + 1}`}</td>
                            <td className="p-2 border">{sy.semester_description}</td>
                            <td className="p-2 border">{getStatus(sy.activator)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SchoolYearPanel;
