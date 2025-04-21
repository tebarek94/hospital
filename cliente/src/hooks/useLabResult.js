import { useState, useEffect } from "react";
import axios from "axios";

const useLabResult = () => {
    const [labResults, setLabResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the lab results when the component mounts
        const fetchLabResults = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/labResults");
                setLabResults(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load lab results." ,err);
                setLoading(false);
            }
        };

        fetchLabResults();
    }, []);

    // Add a new lab result
    const addLabResult = async (newLabResult) => {
        try {
            const response = await axios.post("http://localhost:5000/api/labResults", newLabResult);
            setLabResults([...labResults, response.data]);
        } catch (err) {
            setError("Failed to add lab result.",err);
        }
    };

    // Update an existing lab result
    const updateLabResult = async (id, updatedResult) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/labResults/${id}`, updatedResult);
            setLabResults(labResults.map((result) => (result.Lab_ID === id ? response.data : result)));
        } catch (err) {
            setError("Failed to update lab result.",err);
        }
    };

    // Delete a lab result
    const deleteLabResult = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/labResults/${id}`);
            setLabResults(labResults.filter((result) => result.Lab_ID !== id));
        } catch (err) {
            setError("Failed to delete lab result.",err);
        }
    };

    return { labResults, loading, error, addLabResult, updateLabResult, deleteLabResult };
};

export default useLabResult;
