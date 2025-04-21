import { useEffect, useState } from 'react'

function usePrescription() {
 const [prescription, setPrescription] = useState([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)

 useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/prescriptions');
        const data = await response.json();
        console.log(data)
        setPrescription(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPrescription();
  }, []);
  return {prescription, loading, error} 
}

export default usePrescription
