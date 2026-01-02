import { LayoutDashboard, Package, ShoppingCart, BarChart3, Settings, Pill } from 'lucide-react';
import { UserProfileSection } from './UserProfileSection';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isOpen: boolean;
  userRole: string;
  user: any;
  onViewProfile: () => void;
  onLockScreen: () => void;
  onEndShift: () => void;
}

const NAVIGATION = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'pharmacist', 'staff'] },
  { id: 'inventory', label: 'Inventory', icon: Package, roles: ['admin', 'pharmacist', 'staff'] },
  { id: 'sales', label: 'Sales & Dispensing', icon: ShoppingCart, roles: ['admin', 'pharmacist'] },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['admin', 'pharmacist'] },
  { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] },
];

export function Sidebar({ currentView, setCurrentView, isOpen, userRole, user, onViewProfile, onLockScreen, onEndShift }: SidebarProps) {
  const filteredNav = NAVIGATION.filter((item) => item.roles.includes(userRole));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => {
            // This would need to be passed from parent, but for now it's placeholder
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-0 md:w-20'
        } overflow-hidden flex-shrink-0 fixed md:relative z-50 h-full`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30">
                <Pill className="w-6 h-6 text-white" />
              </div>
              {isOpen && <span className="text-gray-900">Pharmacore</span>}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all touch-manipulation ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <UserProfileSection
            user={user}
            onViewProfile={onViewProfile}
            onLockScreen={onLockScreen}
            onEndShift={onEndShift}
            isOpen={isOpen}
          />

          {/* PWA Status Indicator (mobile only) */}
          {isOpen && (
            <div className="p-4 border-t border-gray-200 md:hidden">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>App Mode</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}