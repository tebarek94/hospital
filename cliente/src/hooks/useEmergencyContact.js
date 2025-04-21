import { useEffect, useState } from "react";

function useEmergencyContact() {
  const [emergencyContact, setEmergencyContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmergencyContact = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/emergency-contacts");
        if (!response.ok) {
          throw new Error("Failed to fetch emergency contacts");
        }
        const data = await response.json();
        setEmergencyContact(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyContact();
  }, []);

  const deleteEmergencyContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/emergency-contacts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEmergencyContact(emergencyContact.filter((contact) => contact.Contact_ID !== id));
      } else {
        throw new Error("Failed to delete emergency contact");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const addEmergencyContact = async (contact) => {
    try {
      const response = await fetch("http://localhost:5000/api/emergency-contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      const data = await response.json();
      setEmergencyContact([...emergencyContact, data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateEmergencyContact = async (id, contact) => {
    try {
      const response = await fetch(`http://localhost:5000/api/emergency-contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      const data = await response.json();
      setEmergencyContact(
        emergencyContact.map((existingContact) =>
          existingContact.Contact_ID === id ? data : existingContact
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return { emergencyContact, loading, error, addEmergencyContact, updateEmergencyContact, deleteEmergencyContact };
}

export default useEmergencyContact;
