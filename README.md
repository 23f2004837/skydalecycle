# Skydale Cycle - Repair Portal

A Next.js-based cycle repair booking portal with Firebase authentication and Firestore database.

## Features

- **Firebase Google Sign-In**: Users authenticate with their Google account
- **Booking System**: Select a date from calendar, choose time slot, add notes
- **Booking History**: View all past bookings with status tracking
- **Firestore Integration**: All bookings saved to Firestore with 'requested' status
- **GPay Integration Ready**: Placeholder API route for server-side GPay verification
- **Tailwind CSS UI**: Modern, responsive design

## Setup Instructions

### 1. Firebase Configuration

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Google Sign-In in Authentication > Sign-in method
3. Create a Firestore database in Firestore Database
4. Get your Firebase config from Project Settings > General

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Run Locally

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

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── components/
│   ├── Header.jsx              # Navigation bar with sign-in
│   ├── BookingModal.jsx        # Time slot selection modal
│   └── CalendarBooking.jsx     # Date picker calendar
├── lib/
│   └── firebase.js             # Firebase initialization
├── pages/
│   ├── _app.js                 # Next.js app wrapper
│   ├── index.js                # Main booking page
│   └── api/
│       └── gpay-demo.js        # GPay verification API route
├── styles/
│   └── globals.css             # Global styles with Tailwind
└── [config files]
```

## Firestore Data Structure

### Bookings Collection

```javascript
{
  userId: string,
  userName: string,
  userEmail: string,
  date: timestamp,
  timeSlot: string,
  notes: string,
  status: 'requested' | 'confirmed' | 'completed' | 'cancelled',
  createdAt: timestamp
}
```

## Next Steps

1. **GPay Integration**: Implement full server-side GPay transaction verification
2. **Firestore Security Rules**: Add rules to secure user data
3. **Admin UI**: Create admin dashboard to manage bookings
4. **Slot Conflict Checks**: Prevent double-booking of time slots
5. **Email Notifications**: Send confirmation emails for bookings
6. **SMS Reminders**: Add SMS reminders for upcoming appointments

## Technologies

- **Next.js 13**: React framework with API routes
- **React 18**: UI library
- **Firebase 10**: Authentication and Firestore database
- **Tailwind CSS 3**: Utility-first CSS framework
- **React Calendar**: Date picker component

## License

MIT