import { useState, useEffect } from 'react';
import {
  Database,
  Cloud,
  HardDrive,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Clock,
  Wifi,
  WifiOff,
  AlertCircle,
} from 'lucide-react';
import { syncManager } from '../services/syncManager';
import { db } from '../services/database';

export function LocalStorageManager() {
  const [storageStats, setStorageStats] = useState<any>(null);
  const [syncInfo, setSyncInfo] = useState(syncManager.getSyncInfo());
  const [syncLogs, setSyncLogs] = useState<any[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    loadData();

    // Subscribe to sync status changes
    const unsubscribe = syncManager.onSyncStatusChange((status) => {
      setSyncInfo(syncManager.getSyncInfo());
      if (status.status === 'success') {
        loadData();
      }
    });

    // Refresh sync info every 10 seconds
    const interval = setInterval(() => {
      setSyncInfo(syncManager.getSyncInfo());
    }, 10000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const loadData = async () => {
    try {
      const stats = await db.getStorageStats();
      setStorageStats(stats);

      const logs = await db.getSyncLogs(10);
      setSyncLogs(logs);
    } catch (error) {
      console.error('Failed to load storage data:', error);
    }
  };

  const handleManualSync = async () => {
    await syncManager.sync({ summaryOnly: false });
  };

  const handleExportBackup = async () => {
    setIsExporting(true);
    try {
      const blob = await syncManager.exportFullBackup();
      
      // Download the file
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pharmacore_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export backup:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleUploadToCloud = async () => {
    setIsUploading(true);
    try {
      const success = await syncManager.uploadBackupToCloud();
      if (success) {
        alert('✅ Backup uploaded to cloud successfully!');
      } else {
        alert('❌ Failed to upload backup to cloud');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearOldData = async () => {
    try {
      const deletedCount = await db.clearOldTransactions(90);
      alert(`🗑️ Deleted ${deletedCount} old transactions (90+ days, already synced)`);
      loadData();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to clear old data:', error);
      alert('Failed to clear old data');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-400" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatRelativeTime = (date: Date | null) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (!storageStats) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-1">Local Storage Manager</h2>
        <p className="text-gray-600">Manage offline data and cloud sync</p>
      </div>

      {/* Network Status */}
      <div className={`p-4 rounded-lg border-2 ${
        syncInfo.isOnline 
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-3">
          {syncInfo.isOnline ? (
            <Wifi className="w-5 h-5 text-green-600" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-600" />
          )}
          <div className="flex-1">
            <p className={`font-medium ${
              syncInfo.isOnline ? 'text-green-900' : 'text-red-900'
            }`}>
              {syncInfo.isOnline ? 'Online' : 'Offline'}
            </p>
            <p className={`text-sm ${
              syncInfo.isOnline ? 'text-green-700' : 'text-red-700'
            }`}>
              {syncInfo.isOnline 
                ? 'Connected to network - auto-sync enabled'
                : 'Working offline - changes saved locally'
              }
            </p>
          </div>
          {syncInfo.lastSyncTime && (
            <div className="text-right">
              <p className="text-sm text-gray-600">Last sync</p>
              <p className="text-sm font-medium text-gray-900">
                {formatRelativeTime(syncInfo.lastSyncTime)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Storage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{storageStats.totalRecords}</p>
          <p className="text-sm text-gray-600">Total records</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <HardDrive className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-gray-500">Local</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{storageStats.transactionCount}</p>
          <p className="text-sm text-gray-600">Transactions</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Database className="w-5 h-5 text-green-600" />
            <span className="text-xs text-gray-500">Inventory</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{storageStats.inventoryCount}</p>
          <p className="text-sm text-gray-600">Items</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Cloud className="w-5 h-5 text-amber-600" />
            <span className="text-xs text-gray-500">Pending</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{storageStats.unsyncedTransactions}</p>
          <p className="text-sm text-gray-600">Unsynced</p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Data Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Manual Sync */}
          <button
            onClick={handleManualSync}
            disabled={!syncInfo.isOnline || syncInfo.isSyncing}
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 text-blue-600 ${syncInfo.isSyncing ? 'animate-spin' : ''}`} />
            <div className="text-left">
              <p className="font-medium text-gray-900">
                {syncInfo.isSyncing ? 'Syncing...' : 'Manual Sync'}
              </p>
              <p className="text-sm text-gray-600">Sync all changes to cloud</p>
            </div>
          </button>

          {/* Export Backup */}
          <button
            onClick={handleExportBackup}
            disabled={isExporting}
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors disabled:opacity-50"
          >
            <Download className={`w-5 h-5 text-green-600 ${isExporting ? 'animate-bounce' : ''}`} />
            <div className="text-left">
              <p className="font-medium text-gray-900">Export Backup</p>
              <p className="text-sm text-gray-600">Download local data as JSON</p>
            </div>
          </button>

          {/* Upload to Cloud */}
          <button
            onClick={handleUploadToCloud}
            disabled={!syncInfo.isOnline || isUploading}
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className={`w-5 h-5 text-purple-600 ${isUploading ? 'animate-bounce' : ''}`} />
            <div className="text-left">
              <p className="font-medium text-gray-900">Upload to Cloud</p>
              <p className="text-sm text-gray-600">Backup full database to cloud</p>
            </div>
          </button>

          {/* Clear Old Data */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Clear Old Data</p>
              <p className="text-sm text-gray-600">Remove synced records (90+ days)</p>
            </div>
          </button>
        </div>
      </div>

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 font-medium mb-1">Local-First Architecture</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• All POS transactions work offline and are saved locally</li>
              <li>• Sales summaries sync automatically every 15 minutes</li>
              <li>• Detailed transaction logs stay on your device unless you export them</li>
              <li>• Full backups can be uploaded to cloud storage on demand</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sync Logs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Recent Sync Activity</h3>
        
        {syncLogs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No sync activity yet</p>
        ) : (
          <div className="space-y-3">
            {syncLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                {getStatusIcon(log.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 capitalize">{log.type.replace('-', ' ')}</p>
                    {log.recordCount > 0 && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        {log.recordCount} records
                      </span>
                    )}
                  </div>
                  {log.errorMessage && (
                    <p className="text-sm text-red-600">{log.errorMessage}</p>
                  )}
                </div>
                <p className="text-sm text-gray-500">{formatDate(log.timestamp)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold">Clear Old Data?</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              This will delete all synced transactions older than 90 days from your local device. 
              The data remains safely backed up in the cloud.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearOldData}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
