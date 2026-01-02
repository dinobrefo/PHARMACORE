import { useState } from 'react';
import { Pill, Lock, Mail, Shield, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

// Mock tenants/pharmacies
const MOCK_TENANTS = [
  { id: 'pharma-1', name: 'HealthPlus Pharmacy' },
  { id: 'pharma-2', name: 'CareRx Pharmacy' },
  { id: 'pharma-3', name: 'WellnessMed Pharmacy' },
];

// Mock users
const MOCK_USERS = [
  {
    email: 'godadmin@pharmacore.system',
    password: 'god2024!secure',
    tenantId: 'system',
    role: 'godadmin',
    name: 'System Administrator',
  },
  {
    email: 'admin@healthplus.com',
    password: 'admin123',
    tenantId: 'pharma-1',
    role: 'admin',
    name: 'Sarah Johnson',
  },
  {
    email: 'pharmacist@healthplus.com',
    password: 'pharma123',
    tenantId: 'pharma-1',
    role: 'pharmacist',
    name: 'Dr. Michael Chen',
  },
  {
    email: 'admin@carerx.com',
    password: 'admin123',
    tenantId: 'pharma-2',
    role: 'admin',
    name: 'Emily Rodriguez',
  },
];

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const tenant = MOCK_TENANTS.find((t) => t.id === user.tenantId);
      onLogin({
        ...user,
        tenantName: tenant?.name,
      });
    } else {
      setError('Invalid credentials. Try admin@healthplus.com / admin123');
    }
  };

  // Check if GodAdmin mode based on email
  const isGodAdminMode = email.includes('godadmin');

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Gradient Background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${isGodAdminMode
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
        }`}>
        {/* Animated gradient orbs */}
        <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse ${isGodAdminMode ? 'bg-purple-600' : 'bg-blue-400'
          }`} style={{ animationDuration: '4s' }} />
        <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse ${isGodAdminMode ? 'bg-indigo-600' : 'bg-pink-400'
          }`} style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${isGodAdminMode ? 'bg-purple-500' : 'bg-purple-400'
          }`} style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid pattern */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={isGodAdminMode ? '#8b5cf6' : '#3b82f6'}
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Pills/Shapes Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Pill 1 */}
        <div className={`absolute top-20 left-[10%] w-16 h-16 rounded-2xl ${isGodAdminMode ? 'bg-purple-500/10' : 'bg-blue-500/10'
          } backdrop-blur-sm border ${isGodAdminMode ? 'border-purple-400/20' : 'border-blue-400/20'
          } flex items-center justify-center animate-float`}>
          <Pill className={`w-8 h-8 ${isGodAdminMode ? 'text-purple-400' : 'text-blue-400'}`} />
        </div>

        {/* Floating Pill 2 */}
        <div className={`absolute top-40 right-[15%] w-12 h-12 rounded-xl ${isGodAdminMode ? 'bg-indigo-500/10' : 'bg-purple-500/10'
          } backdrop-blur-sm border ${isGodAdminMode ? 'border-indigo-400/20' : 'border-purple-400/20'
          } flex items-center justify-center animate-float-delayed`}>
          <Sparkles className={`w-6 h-6 ${isGodAdminMode ? 'text-indigo-400' : 'text-purple-400'}`} />
        </div>

        {/* Floating Shield (GodAdmin) */}
        {isGodAdminMode && (
          <div className="absolute bottom-40 left-[20%] w-14 h-14 rounded-xl bg-purple-500/10 backdrop-blur-sm border border-purple-400/20 flex items-center justify-center animate-float">
            <Shield className="w-7 h-7 text-purple-400" />
          </div>
        )}

        {/* Floating Pill 3 */}
        <div className={`absolute bottom-32 right-[20%] w-10 h-10 rounded-lg ${isGodAdminMode ? 'bg-violet-500/10' : 'bg-pink-500/10'
          } backdrop-blur-sm border ${isGodAdminMode ? 'border-violet-400/20' : 'border-pink-400/20'
          } flex items-center justify-center animate-float-slow`}>
          <Pill className={`w-5 h-5 ${isGodAdminMode ? 'text-violet-400' : 'text-pink-400'}`} />
        </div>

        {/* Floating Circle 1 */}
        <div className={`absolute top-[60%] left-[8%] w-20 h-20 rounded-full ${isGodAdminMode ? 'bg-purple-400/5' : 'bg-blue-400/5'
          } backdrop-blur-sm border ${isGodAdminMode ? 'border-purple-400/10' : 'border-blue-400/10'
          } animate-float`} />

        {/* Floating Circle 2 */}
        <div className={`absolute top-[25%] right-[25%] w-16 h-16 rounded-full ${isGodAdminMode ? 'bg-indigo-400/5' : 'bg-purple-400/5'
          } backdrop-blur-sm border ${isGodAdminMode ? 'border-indigo-400/10' : 'border-purple-400/10'
          } animate-float-delayed`} />

        {/* Floating Pills scattered */}
        <div className={`absolute top-[15%] left-[70%] w-8 h-8 rounded-lg ${isGodAdminMode ? 'bg-purple-500/5' : 'bg-blue-500/5'
          } backdrop-blur-sm animate-float-slow`} />
        <div className={`absolute top-[70%] left-[75%] w-12 h-12 rounded-xl ${isGodAdminMode ? 'bg-violet-500/5' : 'bg-pink-500/5'
          } backdrop-blur-sm animate-float`} />
        <div className={`absolute top-[45%] left-[5%] w-10 h-10 rounded-lg ${isGodAdminMode ? 'bg-indigo-500/5' : 'bg-purple-500/5'
          } backdrop-blur-sm animate-float-delayed`} />
      </div>

      {/* Decorative Corner Graphics */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={isGodAdminMode ? '#8b5cf6' : '#3b82f6'}
            strokeWidth="0.5"
            strokeDasharray="5,5"
            className="animate-spin-slow"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke={isGodAdminMode ? '#a78bfa' : '#60a5fa'}
            strokeWidth="0.5"
            strokeDasharray="3,3"
            className="animate-spin-reverse"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon
            points="100,20 180,180 20,180"
            fill="none"
            stroke={isGodAdminMode ? '#8b5cf6' : '#ec4899'}
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDuration: '5s' }}
          />
          <polygon
            points="100,40 160,160 40,160"
            fill="none"
            stroke={isGodAdminMode ? '#a78bfa' : '#f472b6'}
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDuration: '7s' }}
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo & Branding */}
        <div className="text-center mb-8 animate-fade-in">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 shadow-2xl transition-all duration-500 ${isGodAdminMode
            ? 'bg-gradient-to-br from-purple-600 to-indigo-600'
            : 'bg-gradient-to-br from-blue-600 to-purple-600'
            }`}>
            {isGodAdminMode ? (
              <Shield className="w-10 h-10 text-white animate-pulse" style={{ animationDuration: '3s' }} />
            ) : (
              <Pill className="w-10 h-10 text-white" />
            )}
          </div>
          <h1 className={`mb-2 transition-colors duration-500 ${isGodAdminMode ? 'text-white' : 'text-gray-900'
            }`}>
            {isGodAdminMode ? 'Pharmacore GodAdmin' : 'Pharmacore'}
          </h1>
          <p className={`transition-colors duration-500 ${isGodAdminMode ? 'text-purple-200' : 'text-gray-600'
            }`}>
            {isGodAdminMode ? 'System Control Panel' : 'Pharmacy Management Platform'}
          </p>
        </div>

        {/* Login Card */}
        <div className={`rounded-2xl shadow-2xl p-8 backdrop-blur-xl transition-all duration-500 animate-slide-up ${isGodAdminMode
          ? 'bg-slate-800/90 border border-purple-500/20'
          : 'bg-white/90 border border-white/50'
          }`}>
          <h2 className={`mb-6 transition-colors duration-500 ${isGodAdminMode ? 'text-white' : 'text-gray-900'
            }`}>
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className={`block mb-2 transition-colors duration-500 ${isGodAdminMode ? 'text-slate-300' : 'text-gray-700'
                  }`}
              >
                Email address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-500 ${isGodAdminMode ? 'text-purple-400' : 'text-gray-400'
                  }`} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-lg transition-all duration-300 ${isGodAdminMode
                    ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    } border`}
                  placeholder="you@pharmacy.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block mb-2 transition-colors duration-500 ${isGodAdminMode ? 'text-slate-300' : 'text-gray-700'
                  }`}
              >
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-500 ${isGodAdminMode ? 'text-purple-400' : 'text-gray-400'
                  }`} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-lg transition-all duration-300 ${isGodAdminMode
                    ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    } border`}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg border border-red-200 animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${isGodAdminMode
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/50'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/50'
                }`}
            >
              Sign in
            </button>
          </form>

          {/* Demo Credentials */}
          <div className={`mt-6 p-4 rounded-lg transition-all duration-500 ${isGodAdminMode
            ? 'bg-slate-900/50 border border-slate-700'
            : 'bg-gray-50 border border-gray-200'
            }`}>
            <p className={`mb-2 transition-colors duration-500 ${isGodAdminMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
              Demo Credentials:
            </p>
            <div className={`space-y-1 transition-colors duration-500 ${isGodAdminMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
              <p className={isGodAdminMode ? 'text-purple-400' : ''}>
                <strong>GodAdmin:</strong> godadmin@pharmacore.system / god2024!secure
              </p>
              <p><strong>Admin:</strong> admin@healthplus.com / admin123</p>
              <p><strong>Pharmacist:</strong> pharmacist@healthplus.com / pharma123</p>
            </div>
          </div>
        </div>

        <p className={`text-center mt-6 transition-colors duration-500 ${isGodAdminMode ? 'text-purple-300' : 'text-gray-500'
          }`}>
          Multi-tenant pharmacy management system
        </p>
      </div>


    </div>
  );
}
