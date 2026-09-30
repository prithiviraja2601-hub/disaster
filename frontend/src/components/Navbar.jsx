import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

// A simple hook alternative since we don't have react-firebase-hooks installed
const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    return auth.onAuthStateChanged(setUser);
  }, []);
  return { user };
};

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          DMEvent '26
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors">Register</Link>
          {user && (
            <>
              <span className="w-px h-6 bg-slate-700 mx-2"></span>
              <Link to="/admin/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
              <button onClick={handleLogout} className="text-slate-300 hover:text-white transition-colors">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
