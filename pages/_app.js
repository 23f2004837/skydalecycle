import { createContext, useState, useEffect } from 'react';
import { onAuthState } from '../lib/firebase';
import Header from '../components/Header';
import '../styles/globals.css';
import 'react-calendar/dist/Calendar.css';

export const UserContext = createContext();

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthState((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user }}>
      <Header />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
