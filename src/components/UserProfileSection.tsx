import { useState } from 'react';
import { User, ChevronUp, LogOut, Lock, Clock, Eye } from 'lucide-react';

interface UserProfileSectionProps {
  user: any;
  onViewProfile: () => void;
  onLockScreen: () => void;
  onEndShift: () => void;
  isOpen: boolean;
}

export function UserProfileSection({ 
  user, 
  onViewProfile, 
  onLockScreen, 
  onEndShift,
  isOpen 
}: UserProfileSectionProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'pharmacist':
        return 'bg-blue-100 text-blue-700';
      case 'staff':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isOpen) {
    return (
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          {getInitials(user.name)}
        </button>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      {/* Menu Dropdown */}
      {menuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute bottom-20 left-4 right-4 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            <button
              onClick={() => {
                onViewProfile();
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <Eye className="w-5 h-5" />
              <span>View Profile</span>
            </button>
            <button
              onClick={() => {
                onLockScreen();
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <Lock className="w-5 h-5" />
              <span>Lock Screen</span>
            </button>
            <button
              onClick={() => {
                onEndShift();
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
            >
              <Clock className="w-5 h-5" />
              <span>End Shift</span>
            </button>
          </div>
        </>
      )}

      {/* User Profile Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-full p-4 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm">{getInitials(user.name)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 font-medium truncate">{user.name}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(user.role)}`}>
                {user.role}
              </span>
            </div>
          </div>
          <ChevronUp 
            className={`w-5 h-5 text-gray-400 transition-transform ${
              menuOpen ? 'rotate-180' : ''
            }`} 
          />
        </div>
      </button>

      {/* Active Session Info */}
      {user.shiftStartTime && (
        <div className="px-4 pb-3">
          <div className="bg-white rounded-lg p-2 border border-gray-200">
            <p className="text-xs text-gray-500">Active since</p>
            <p className="text-xs text-gray-900 font-medium">
              {new Date(user.shiftStartTime).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
