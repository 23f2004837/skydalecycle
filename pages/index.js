import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import Header from '../components/Header';
import CalendarBooking from '../components/CalendarBooking';
import BookingModal from '../components/BookingModal';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchBookings(currentUser.uid);
      } else {
        setBookings([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user's bookings from Firestore
  const fetchBookings = async (userId) => {
    setLoadingBookings(true);
    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedBookings = [];
      querySnapshot.forEach((doc) => {
        fetchedBookings.push({ id: doc.id, ...doc.data() });
      });
      setBookings(fetchedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Handle date selection from calendar
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Create a new booking
  const handleConfirmBooking = async (timeSlot, notes) => {
    if (!user) return;

    try {
      const bookingData = {
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userEmail: user.email,
        date: selectedDate,
        timeSlot,
        notes: notes || '',
        status: 'requested',
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'bookings'), bookingData);
      console.log('Booking created:', docRef.id);

      // Refresh bookings list
      await fetchBookings(user.uid);

      alert('Booking created successfully!');
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'requested':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <span className="text-6xl">🚲</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Skydale Cycle Repair Portal
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Please sign in with Google to book a repair appointment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div>
              <CalendarBooking onDateSelect={handleDateSelect} />
            </div>

            {/* Bookings History Section */}
            <div>
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Your Bookings
                </h2>

                {loadingBookings ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No bookings yet</p>
                    <p className="text-sm mt-2">
                      Select a date from the calendar to create your first booking
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {formatDate(booking.date)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {booking.timeSlot}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        {booking.notes && (
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Notes:</span> {booking.notes}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          Booked on {formatDate(booking.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}
