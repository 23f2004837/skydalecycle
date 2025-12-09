import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarBooking({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  // Disable past dates
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Select a Date</h2>
      <div className="calendar-container">
        <style jsx global>{`
          .react-calendar {
            width: 100%;
            border: none;
            font-family: inherit;
          }
          
          .react-calendar__tile {
            padding: 1em 0.5em;
            border-radius: 0.5rem;
          }
          
          .react-calendar__tile:enabled:hover,
          .react-calendar__tile:enabled:focus {
            background-color: #dbeafe;
          }
          
          .react-calendar__tile--active {
            background: #2563eb !important;
            color: white !important;
          }
          
          .react-calendar__tile--now {
            background: #e0e7ff;
          }
          
          .react-calendar__navigation button {
            font-size: 1.1em;
            font-weight: 600;
          }
          
          .react-calendar__navigation button:enabled:hover,
          .react-calendar__navigation button:enabled:focus {
            background-color: #e5e7eb;
          }
          
          .react-calendar__month-view__days__day--weekend {
            color: #dc2626;
          }
          
          .react-calendar__tile:disabled {
            background-color: #f3f4f6;
            color: #9ca3af;
          }
        `}</style>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={minDate}
          className="shadow-sm"
        />
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Selected Date:</p>
        <p className="font-semibold text-gray-900">
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}
