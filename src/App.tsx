import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Sales } from './components/Sales';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { OfflineIndicator } from './components/OfflineIndicator';
import { UserProfileModal } from './components/UserProfileModal';
import { LockScreen } from './components/LockScreen';
import { EndShiftModal } from './components/EndShiftModal';
import { GodAdminDashboard } from './components/GodAdminDashboard';
import { initializeDatabase, destroyDatabase } from './services/database';
import { syncManager } from './services/syncManager';

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEndShiftModal, setShowEndShiftModal] = useState(false);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('pharmacy_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      
      // Initialize database for existing session (skip for GodAdmin)
      if (user.role !== 'godadmin' && user.tenantId) {
        initializeDatabase(user.tenantId).then(() => {
          syncManager.startAutoSync();
          console.log('✅ Database restored for tenant:', user.tenantId);
        }).catch(error => {
          console.error('Failed to restore database:', error);
        });
      }
    }
  }, []);

  const handleLogin = async (user: any) => {
    // Add shift start time when user logs in
    const userWithShift = {
      ...user,
      shiftStartTime: new Date().toISOString(),
      todaySales: 0,
    };
    setCurrentUser(userWithShift);
    localStorage.setItem('pharmacy_user', JSON.stringify(userWithShift));

    // Initialize database for this tenant (skip for GodAdmin)
    if (user.role !== 'godadmin' && user.tenantId) {
      try {
        await initializeDatabase(user.tenantId);
        // Start automatic sync after database is initialized
        syncManager.startAutoSync();
        console.log('✅ Database initialized and sync started for tenant:', user.tenantId);
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pharmacy_user');
    setCurrentView('dashboard');
    setIsLocked(false);
    setShowEndShiftModal(false);
  };

  const handleLockScreen = () => {
    setIsLocked(true);
  };

  const handleUnlock = (password: string) => {
    // In a real app, verify password against user's actual password
    // For demo purposes, accept any non-empty password
    if (password && password.length > 0) {
      setIsLocked(false);
      return true;
    }
    return false;
  };

  const handleViewProfile = () => {
    setShowProfileModal(true);
  };

  const handleEndShift = () => {
    setShowEndShiftModal(true);
  };

  const confirmEndShift = () => {
    // Save shift data before logging out
    const shiftData = {
      userId: currentUser.id,
      startTime: currentUser.shiftStartTime,
      endTime: new Date().toISOString(),
      totalSales: currentUser.todaySales || 0,
    };
    
    // In a real app, send this to backend
    console.log('Shift ended:', shiftData);
    
    handleLogout();
  };

  // Mock shift data for end shift modal
  const getShiftData = () => {
    return {
      startTime: currentUser?.shiftStartTime || new Date().toISOString(),
      totalSales: 2850.50,
      cashSales: 1200.00,
      mobileMoneySales: 1650.50,
      transactionCount: 45,
      itemsSold: 127,
    };
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Show GodAdmin dashboard if user is godadmin
  if (currentUser.role === 'godadmin') {
    return <GodAdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  // Show lock screen if locked
  if (isLocked) {
    return (
      <LockScreen 
        user={currentUser} 
        onUnlock={handleUnlock} 
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={sidebarOpen}
        userRole={currentUser.role}
        user={currentUser}
        onViewProfile={handleViewProfile}
        onLockScreen={handleLockScreen}
        onEndShift={handleEndShift}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={currentUser}
          onLogout={handleLogout}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {currentView === 'dashboard' && <Dashboard user={currentUser} />}
          {currentView === 'inventory' && <Inventory user={currentUser} />}
          {currentView === 'sales' && <Sales user={currentUser} />}
          {currentView === 'analytics' && <Analytics user={currentUser} />}
          {currentView === 'settings' && <Settings user={currentUser} />}
          {currentView === 'godadmin' && <GodAdminDashboard user={currentUser} />}
        </main>
      </div>

      {/* PWA Components */}
      <PWAInstallPrompt />
      {/* OfflineIndicator removed - status shown in header */}
      
      {/* User Modals */}
      <UserProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={currentUser}
      />
      
      <EndShiftModal 
        isOpen={showEndShiftModal}
        onClose={() => setShowEndShiftModal(false)}
        onConfirm={confirmEndShift}
        user={currentUser}
        shiftData={getShiftData()}
      />
    </div>
  );
}