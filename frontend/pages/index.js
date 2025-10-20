import { useEffect, useState } from 'react';
import API from '../lib/api';
import Router from 'next/router';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    API.get('/api/auth/me')
      .then(res => setUser(res.data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
    Router.push('/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-semibold mb-2">You're not signed in</h2>
          <p className="text-sm text-gray-500 mb-6">Please sign in to continue.</p>
          <a className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white" href="/login">Sign in</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold">Hello, {user.name || user.email} 👋</h2>
        <p className="text-sm text-gray-500 mt-2">You're logged in.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={logout} className="px-4 py-2 rounded-lg border">Sign out</button>
        </div>
      </div>
    </div>
  );
}