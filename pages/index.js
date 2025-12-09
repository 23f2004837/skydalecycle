import { useContext } from 'react';
import { UserContext } from './_app';
import CalendarBooking from '../components/CalendarBooking';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <CalendarBooking />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to Skydale Cycle Repair Portal</h1>
          <p className="text-xl text-gray-600 mb-8">Please sign in to book a repair appointment</p>
        </div>
      )}
    </div>
  );
}
