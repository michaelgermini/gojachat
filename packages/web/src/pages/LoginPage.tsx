import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginUser } from '@/store/slices/authSlice';
import { UserAvatar } from '@/components/UserAvatar';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/chat');
    } catch (err) {
      // L'erreur est gérée par le slice
    }
  };

  const demoUsers = [
    { email: 'alice@gojachat.com', password: 'password', name: 'Alice' },
    { email: 'bob@gojachat.com', password: 'password', name: 'Bob' },
    { email: 'charlie@gojachat.com', password: 'password', name: 'Charlie' },
  ];

  const loginAsDemo = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">GojaChat</h1>
          <p className="text-gray-600">Sign in to start chatting</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign in with a demo account</span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {demoUsers.map((user, index) => (
                <button
                  key={user.email}
                  onClick={() => loginAsDemo(user.email, user.password)}
                  className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <UserAvatar
                    user={{
                      id: index + 1,
                      username: user.name,
                      email: user.email,
                      avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
                      status: 'online',
                      lastSeen: new Date().toISOString(),
                    }}
                    size="sm"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Password for all demo accounts: <strong>password</strong></p>
        </div>
      </div>
    </div>
  );
};
