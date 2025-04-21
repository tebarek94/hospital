import { useEffect, useState } from 'react';

function usePatientHistory() {
  const [patientHistory, setPatientHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatientHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/patient-history');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPatientHistory(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addPatientHistory = async (newHistory) => {
    try {
      const response = await fetch('http://localhost:5000/api/patient-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHistory),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const addedHistory = await response.json();
      setPatientHistory((prev) => [...prev, addedHistory]);
    } catch (error) {
      setError(error.message);
    }
  };

  const updatePatientHistory = async (id, updatedHistory) => {
    try {
      const response = await fetch(`http://localhost:5000/api/patient-history/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHistory),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = await response.json();
      setPatientHistory((prev) =>
        prev.map((item) => (item.History_ID === id ? updatedData : item))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const deletePatientHistory = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/patient-history/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setPatientHistory((prev) => prev.filter((item) => item.History_ID !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPatientHistory();
  }, []);

  return { patientHistory, loading, error, addPatientHistory, updatePatientHistory, deletePatientHistory };
}

export default usePatientHistory;
