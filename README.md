# Skydale Cycle Repair Portal

A Next.js-based cycle repair booking portal with Firebase authentication and Firestore database integration.

## Features

- 🔐 Google Sign-in authentication via Firebase
- 📅 Calendar-based booking interface using react-calendar
- ⏰ Time slot selection with booking modal
- 📝 Add notes for repair requests
- 📊 View past bookings with status tracking
- 💳 Placeholder GPay API endpoint for future payment integration

## Setup Instructions

### Prerequisites

- Node.js 16+ installed
- Firebase project created at https://console.firebase.google.com/

### Firebase Configuration

1. Create a new Firebase project or use an existing one
2. Enable Google Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google as a sign-in provider
3. Create a Firestore Database:
   - Go to Firestore Database > Create database
   - Start in test mode (configure rules later)
4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Copy the Firebase configuration object

### Environment Variables

Create a `.env.local` file in the project root with your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will run on http://localhost:3000

## Project Structure

```
skydalecycle/
├── components/
│   ├── Header.jsx              # Authentication header with sign-in/out
│   ├── BookingModal.jsx        # Modal for time slot selection
│   └── CalendarBooking.jsx     # Main calendar and booking list
├── lib/
│   └── firebase.js             # Firebase initialization and helpers
├── pages/
│   ├── _app.js                 # App wrapper with UserContext
│   ├── index.js                # Home page
│   └── api/
│       └── gpay-demo.js        # Placeholder GPay verification endpoint
├── styles/
│   └── globals.css             # Tailwind CSS and custom styles
├── package.json
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## Usage

1. **Sign In**: Click "Sign In with Google" in the header
2. **Book a Repair**: Click on a date in the calendar
3. **Select Time**: Choose a time slot from the modal
4. **Add Notes**: Describe your cycle repair needs (optional)
5. **Confirm**: Click "Confirm Booking" to create the appointment
6. **View Bookings**: See all your bookings listed below the calendar

## Database Schema

### Bookings Collection

```javascript
{
  userId: string,        // Firebase Auth UID
  date: string,          // Date string
  timeSlot: string,      // e.g., "09:00 AM"
  notes: string,         // User notes
  status: string,        // "requested", "confirmed", "completed", etc.
  createdAt: string      // ISO timestamp
}
```

## Next Steps

### Security & Production Readiness

1. **Firestore Security Rules**: Configure proper security rules to restrict access
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /bookings/{booking} {
         allow read, write: if request.auth != null && 
                             request.auth.uid == resource.data.userId;
       }
     }
   }
   ```

2. **Environment Variables**: Move all Firebase config to environment variables (done)

### Feature Enhancements

1. **Google Pay Integration**: 
   - Implement payment flow in booking modal
   - Complete server-side verification in `/api/gpay-demo.js`
   - Store payment status in booking documents

2. **Admin Dashboard**:
   - Create admin role and authentication
   - View all bookings across users
   - Update booking status (confirm, complete, cancel)
   - Manage time slot availability

3. **Booking Improvements**:
   - Check for slot conflicts before confirming
   - Add booking cancellation functionality
   - Email notifications for booking confirmations
   - SMS reminders for upcoming appointments

4. **Calendar Enhancements**:
   - Show unavailable dates/slots
   - Display booking count per day
   - Multi-day availability view

5. **User Experience**:
   - Add loading states and error handling
   - Implement optimistic UI updates
   - Add booking confirmation emails
   - Create booking history filtering

## Technologies Used

- **Next.js 13.4**: React framework with SSR support
- **React 18**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Firebase 9**: Authentication and Firestore database
- **react-calendar**: Calendar component for date selection

## API Routes

### `/api/gpay-demo`

Placeholder endpoint for Google Pay server-side verification.

**Method**: POST

**Response**:
```json
{
  "ok": true,
  "message": "GPay verification endpoint - to be implemented"
}
```

## Contributing

This is a prototype project for Skydale Cycle. For production deployment, ensure all security best practices are followed, including proper Firestore rules, environment variable management, and payment processing compliance.

## License

See LICENSE file for details.