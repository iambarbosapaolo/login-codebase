import { useState } from 'react';
import Router from 'next/router';
import API from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/api/auth/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      // optional: set default header
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      Router.push('/');
    } catch (err) {
      setError(err?.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold hover:opacity-95 transition"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Need an account? <a className="text-indigo-600 underline" href="#" onClick={(e)=>{e.preventDefault(); alert('Use backend /api/auth/register or add UI to register.')}}>Register</a>
        </div>
      </div>
    </div>
  );
}