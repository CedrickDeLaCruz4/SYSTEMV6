import React, { useEffect, useState } from "react";
import axios from "axios";

const YearUpdateForm = () => {
  const [years, setYears] = useState([]);

  const fetchYears = async () => {
    try {
      const res = await axios.get("http://localhost:5000/year_table");
      setYears(res.data);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  const toggleActivator = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;

      await axios.put(`http://localhost:5000/year_table/${id}`, {
        status: newStatus,
      });

      fetchYears(); // Refresh after update
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Year Update Form</h2>
      <h3 className="text-lg font-semibold mb-2">Year Entries</h3>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Activator</th>
          </tr>
        </thead>
        <tbody>
          {years.map((entry) => (
            <tr key={entry.year_id}>
              <td className="p-2 border">{entry.year_description}</td>
              <td className="p-2 border">
                {entry.status === 1 ? "Active" : "Inactive"}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => toggleActivator(entry.year_id, entry.status)}
                  className={`px-3 py-1 rounded text-white ${
                    entry.status === 1 ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  {entry.status === 1 ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YearUpdateForm;
