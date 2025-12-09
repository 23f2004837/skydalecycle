import { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import BookingModal from './BookingModal';
import { UserContext } from '../pages/_app';
import { createBooking, fetchBookingsForUser } from '../lib/firebase';

export default function CalendarBooking() {
  const { user } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const userBookings = await fetchBookingsForUser(user.uid);
      setBookings(userBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleConfirmBooking = async (timeSlot, notes) => {
    if (!user || !selectedDate) return;

    try {
      await createBooking(
        user.uid,
        selectedDate.toDateString(),
        timeSlot,
        notes
      );
      alert('Booking created successfully!');
      setShowModal(false);
      setSelectedDate(null);
      await loadBookings();
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Book Your Cycle Repair</h2>
      
      <div className="mb-8">
        <Calendar
          onClickDay={handleDateClick}
          minDate={new Date()}
          className="border rounded-lg shadow-lg"
        />
      </div>

      {showModal && selectedDate && (
        <BookingModal
          date={selectedDate.toDateString()}
          onClose={() => {
            setShowModal(false);
            setSelectedDate(null);
          }}
          onConfirm={handleConfirmBooking}
        />
      )}

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Your Bookings</h3>
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-600">No bookings yet. Select a date to create one!</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{booking.date} at {booking.timeSlot}</p>
                    <p className="text-sm text-gray-600">Status: {booking.status}</p>
                    {booking.notes && (
                      <p className="text-sm mt-2">Notes: {booking.notes}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded text-sm ${
                    booking.status === 'requested' ? 'bg-yellow-200 text-yellow-800' :
                    booking.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
