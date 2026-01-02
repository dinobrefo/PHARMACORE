import { X, User, Mail, Phone, Calendar, MapPin, Shield, Clock, Activity, Edit2 } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onEditProfile?: () => void;
}

export function UserProfileModal({ isOpen, onClose, user, onEditProfile }: UserProfileModalProps) {
  if (!isOpen) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'on_break':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const calculateShiftDuration = () => {
    if (!user.shiftStartTime) return 'Not started';
    
    const start = new Date(user.shiftStartTime);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with Cover */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-black/20 rounded-lg p-2"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 bg-blue-600 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
              <span className="text-4xl">{getInitials(user.name)}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-20">
          {/* Basic Info */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-gray-900 mb-2">{user.name}</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm capitalize ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusBadgeColor(user.status || 'active')}`}>
                  {user.status === 'on_break' ? 'On Break' : (user.status || 'Active')}
                </span>
              </div>
              {user.licenseNumber && (
                <p className="text-gray-600">License: {user.licenseNumber}</p>
              )}
            </div>
            {onEditProfile && (
              <button
                onClick={onEditProfile}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                </div>
              )}
              {user.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-gray-900">{user.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Employment Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Employment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {user.dateOfBirth && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-gray-900">
                      {new Date(user.dateOfBirth).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
              {user.createdAt && (
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Joined</p>
                    <p className="text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {user.emergencyContact && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Emergency Contact</p>
                <p className="text-gray-900">{user.emergencyContact}</p>
              </div>
            )}
          </div>

          {/* Current Shift */}
          {user.shiftStartTime && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Current Shift
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Started At</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(user.shiftStartTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Duration</p>
                  <p className="text-gray-900 font-medium">{calculateShiftDuration()}</p>
                </div>
              </div>
              {user.todaySales !== undefined && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-xs text-gray-600 mb-1">Today's Sales</p>
                  <p className="text-xl text-gray-900">GH₵ {user.todaySales?.toFixed(2) || '0.00'}</p>
                </div>
              )}
            </div>
          )}

          {/* Performance Stats (Optional) */}
          {user.stats && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl text-gray-900 mb-1">{user.stats.totalSales || 0}</p>
                <p className="text-xs text-gray-500">Total Sales</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl text-gray-900 mb-1">{user.stats.shiftsCompleted || 0}</p>
                <p className="text-xs text-gray-500">Shifts</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl text-gray-900 mb-1">{user.stats.avgSalesPerShift || 0}</p>
                <p className="text-xs text-gray-500">Avg/Shift</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
