import React, { useState, useEffect } from "react";

const useAppointment = () => {
  const [appointments, setAppointments] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/appointments");
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      setAppointments(Array.isArray(data) ? data : []); // Ensure appointments is always an array
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (newAppointment) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
      });
      if (!response.ok) {
        throw new Error("Failed to add appointment");
      }
      await fetchAppointments(); // Refresh data after adding
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id, updatedData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5000/api/appointments/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }
      await fetchAppointments(); // Refresh data after updating
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5000/api/appointments/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }
      await fetchAppointments(); // Refresh data after deleting
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    loading,
    error,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };
};

export default useAppointment;
