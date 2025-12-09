import { useContext } from 'react';
import { UserContext } from '../pages/_app';
import { signInWithGoogle, signOut } from '../lib/firebase';

export default function Header() {
  const { user } = useContext(UserContext);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Skydale Cycle Repair Portal</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.displayName || user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
            >
              Sign In with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
