import React, { useEffect, useState } from 'react';

interface Resident {
  id: string;
  nationalId: number;
  name: string;
  gender: string;
  vehicle: string;
  apartmentNo: number;
}

interface Fee {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
}

interface Apartment {
  id: number;
  apartmentNo: number;
  residents: Resident[];
  fees: Fee[];
}

export default function ApartmentList() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApartments() {
      try {
        const response = await fetch('/api/apartments');
        const data = await response.json();
        setApartments(data);
      } catch (error) {
        setError('Error fetching apartments');
      } finally {
        setLoading(false);
      }
    }

    fetchApartments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>List of Apartments</h1>
      {apartments.length === 0 ? (
        <div>No apartments found.</div>
      ) : (
        <ul>
          {apartments.map((apartment) => (
            <li key={apartment.id}>
              <h2>Apartment No: {apartment.apartmentNo}</h2>
              <h3>Residents:</h3>
              <ul>
                {apartment.residents.map((resident) => (
                  <li key={resident.id}>
                    {resident.name} ({resident.gender}) - Vehicle: {resident.vehicle}
                  </li>
                ))}
              </ul>
              <h3>Fees:</h3>
              <ul>
                {apartment.fees.map((fee) => (
                  <li key={fee.id}>
                    {fee.type}: {fee.amount} (Due: {new Date(fee.dueDate).toLocaleDateString()})
                    {fee.isPaid ? ' - Paid' : ' - Unpaid'}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
