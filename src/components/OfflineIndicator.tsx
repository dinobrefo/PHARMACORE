import { Wifi, WifiOff, Cloud, CloudOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useNetworkStatus, useSyncStatus } from '../hooks/useLocalDatabase';

export function OfflineIndicator() {
  const isOnline = useNetworkStatus();
  const { lastSyncTime, isSyncing } = useSyncStatus();

  const formatLastSync = () => {
    if (!lastSyncTime) return 'Never synced';
    
    const now = new Date();
    const diff = now.getTime() - lastSyncTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just synced';
    if (minutes < 60) return `Synced ${minutes}m ago`;
    if (hours < 24) return `Synced ${hours}h ago`;
    return `Synced ${Math.floor(hours / 24)}d ago`;
  };

  if (isOnline && !isSyncing) {
    // Online and not syncing - show nothing
    return null;
  }

  if (isSyncing) {
    // Currently syncing
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full animate-pulse">
        <Cloud className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-xs text-blue-700 font-medium">Syncing...</span>
      </div>
    );
  }

  // Offline mode
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
      <WifiOff className="w-3.5 h-3.5 text-amber-600" />
      <span className="text-xs text-amber-700 font-medium">Offline Mode</span>
    </div>
  );
}

// Detailed offline banner (for important pages)
export function OfflineBanner() {
  const isOnline = useNetworkStatus();
  const { lastSyncTime, isSyncing } = useSyncStatus();

  const formatLastSync = () => {
    if (!lastSyncTime) return 'Not synced yet';
    
    const now = new Date();
    const diff = now.getTime() - lastSyncTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  if (isOnline && !isSyncing) {
    return null; // Don't show banner when online and synced
  }

  if (isSyncing) {
    return (
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Cloud className="w-5 h-5 text-blue-600 animate-pulse" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">Syncing to cloud...</p>
            <p className="text-xs text-blue-700">Your changes are being uploaded</p>
          </div>
        </div>
      </div>
    );
  }

  // Offline banner
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
      <div className="flex items-center gap-3">
        <WifiOff className="w-5 h-5 text-amber-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-900">Working Offline</p>
          <p className="text-xs text-amber-700">
            All changes are saved locally. Last sync: {formatLastSync()}
          </p>
        </div>
        <AlertCircle className="w-4 h-4 text-amber-600" />
      </div>
    </div>
  );
}

// Sync status widget for dashboard
export function SyncStatusWidget() {
  const isOnline = useNetworkStatus();
  const { lastSyncTime, isSyncing } = useSyncStatus();

  const formatLastSync = () => {
    if (!lastSyncTime) return { text: 'Never', color: 'text-gray-500' };
    
    const now = new Date();
    const diff = now.getTime() - lastSyncTime.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 5) return { text: 'Just now', color: 'text-green-600' };
    if (minutes < 30) return { text: `${minutes}m ago`, color: 'text-green-600' };
    if (minutes < 120) return { text: `${Math.floor(minutes / 60)}h ago`, color: 'text-amber-600' };
    return { text: `${Math.floor(minutes / 1440)}d ago`, color: 'text-red-600' };
  };

  const syncStatus = formatLastSync();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-900 font-medium">Sync Status</h3>
        {isOnline ? (
          <Wifi className="w-5 h-5 text-green-600" />
        ) : (
          <WifiOff className="w-5 h-5 text-amber-600" />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Connection</span>
          <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-amber-600'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Last Sync</span>
          <span className={`text-sm font-medium ${syncStatus.color}`}>
            {isSyncing ? 'Syncing...' : syncStatus.text}
          </span>
        </div>

        {!isOnline && (
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-amber-700 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5" />
              Changes saved locally
            </p>
          </div>
        )}
      </div>
    </div>
  );
}