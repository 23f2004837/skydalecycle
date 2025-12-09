import { useState } from 'react';

export default function BookingModal({ date, onClose, onConfirm }) {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    onConfirm(selectedSlot, notes);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Book Repair for {date}</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Time Slot</label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Choose a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 h-24"
            placeholder="Describe the issue with your cycle..."
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Confirm Booking
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
