import { useEffect, useState } from "react";

function usePayment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payments");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addPayment = async (newPayment) => {
    try {
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPayment),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const addedPayment = await response.json();
      setPayments((prev) => [...prev, addedPayment]);
    } catch (error) {
      setError(error.message);
    }
  };

  const updatePayment = async (id, updatedPayment) => {
    try {
      const response = await fetch(`http://localhost:5000/api/payments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPayment),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = await response.json();
      setPayments((prev) =>
        prev.map((payment) => (payment.Bill_ID === id ? updatedData : payment))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const deletePayment = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/payments/${id}`, {
        method: "DELETE",
      });
      setPayments((prev) => prev.filter((payment) => payment.Bill_ID !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return { payments, loading, error, addPayment, updatePayment, deletePayment };
}

export default usePayment;
