import { useState, useEffect } from "react";

function useInsurance() {
  const [insurance, setInsurance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsurance = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/insurance-info");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setInsurance(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addInsurance = async (newInsurance) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/insurance-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInsurance),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const addedInsurance = await response.json();
      setInsurance((prev) => [...prev, addedInsurance]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateInsurance = async (id, updatedInsurance) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/insurance-info/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedInsurance),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = await response.json();
      setInsurance((prev) =>
        prev.map((item) => (item.Insurance_ID === id ? updatedData : item))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteInsurance = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/insurance-info/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setInsurance((prev) =>
        prev.filter((item) => item.Insurance_ID !== id)
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsurance();
  }, []);

  return { insurance, loading, error, addInsurance, updateInsurance, deleteInsurance };
}

export default useInsurance;
