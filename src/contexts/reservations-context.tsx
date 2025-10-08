import { useState, useContext, createContext, type ReactNode } from 'react';

export interface Reservation {
  id: number;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  property: string;
  nights: number;
  guests: number;
  totalAmount: number;
  email?: string;
  phone?: string;
  channel?: string;
  notes?: string;
}

interface ReservationsContextType {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id'>) => void;
  updateReservation: (id: number, reservation: Partial<Reservation>) => void;
  deleteReservation: (id: number) => void;
}

const ReservationsContext = createContext<ReservationsContextType | undefined>(undefined);

// Initial mock data
const initialReservations: Reservation[] = [
  {
    id: 1,
    guestName: 'John Smith',
    checkInDate: '2024-10-15',
    checkOutDate: '2024-10-18',
    status: 'Confirmed',
    property: 'La Dimora Del Cavaliere',
    nights: 3,
    guests: 2,
    totalAmount: 225,
    email: 'john@example.com',
    phone: '+1234567890',
    channel: 'Airbnb'
  },
  {
    id: 2,
    guestName: 'Maria Garcia',
    checkInDate: '2024-10-20',
    checkOutDate: '2024-10-22',
    status: 'Pending',
    property: 'La Dimora Del Cavaliere',
    nights: 2,
    guests: 4,
    totalAmount: 150,
    email: 'maria@example.com',
    phone: '+1234567891',
    channel: 'Booking.com'
  },
  {
    id: 3,
    guestName: 'David Johnson',
    checkInDate: '2024-10-25',
    checkOutDate: '2024-10-30',
    status: 'Confirmed',
    property: 'La Dimora Del Cavaliere',
    nights: 5,
    guests: 3,
    totalAmount: 375,
    email: 'david@example.com',
    phone: '+1234567892',
    channel: 'Direct'
  }
];

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

  const addReservation = (reservation: Omit<Reservation, 'id'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: Math.max(...reservations.map(r => r.id), 0) + 1
    };
    setReservations(prev => [newReservation, ...prev]); // Add to beginning of array
  };

  const updateReservation = (id: number, updatedReservation: Partial<Reservation>) => {
    setReservations(prev =>
      prev.map(reservation =>
        reservation.id === id ? { ...reservation, ...updatedReservation } : reservation
      )
    );
  };

  const deleteReservation = (id: number) => {
    setReservations(prev => prev.filter(reservation => reservation.id !== id));
  };

  return (
    <ReservationsContext.Provider value={{
      reservations,
      addReservation,
      updateReservation,
      deleteReservation
    }}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationsContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationsProvider');
  }
  return context;
}
