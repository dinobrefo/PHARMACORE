import { useState } from 'react';
import { Lock, Eye, EyeOff, Pill } from 'lucide-react';

interface LockScreenProps {
  user: any;
  onUnlock: (password: string) => boolean;
  onLogout: () => void;
}

export function LockScreen({ user, onUnlock, onLogout }: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = onUnlock(password);
    
    if (!success) {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
    
    setIsLoading(false);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        {/* Time and Date */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-6xl font-light mb-2">{getCurrentTime()}</h1>
          <p className="text-xl opacity-90">{getCurrentDate()}</p>
        </div>

        {/* Lock Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Pill className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">{getInitials(user.name)}</span>
            </div>
            <h2 className="text-gray-900 mb-1">{user.name}</h2>
            <p className="text-gray-600 capitalize">{user.role}</p>
          </div>

          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          {/* Unlock Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Enter your password to unlock</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  autoFocus
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Unlocking...' : 'Unlock'}
            </button>
          </form>

          {/* Footer Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Sign in as different user
            </button>
          </div>
        </div>

        {/* Active Shift Indicator */}
        {user.shiftStartTime && (
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-center">
            <p className="text-sm opacity-90">
              Active shift started at{' '}
              {new Date(user.shiftStartTime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
