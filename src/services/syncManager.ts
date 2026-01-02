import { db, isDatabaseInitialized } from './database';

// Sync configuration
const SYNC_INTERVAL = 15 * 60 * 1000; // 15 minutes
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 5000; // 5 seconds

interface SyncOptions {
  force?: boolean;
  summaryOnly?: boolean;
}

class SyncManager {
  private syncInterval: NodeJS.Timeout | null = null;
  private isSyncing = false;
  private lastSyncTime: Date | null = null;
  private syncListeners: ((status: SyncStatus) => void)[] = [];

  constructor() {
    // Listen for online/offline events
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());
    }
  }

  // Start automatic sync
  startAutoSync() {
    if (this.syncInterval) {
      return;
    }

    console.log('🔄 Starting automatic sync (every 15 minutes)');
    
    // Sync immediately if online
    if (navigator.onLine) {
      this.sync({ summaryOnly: true });
    }

    // Set up periodic sync
    this.syncInterval = setInterval(() => {
      if (navigator.onLine && !this.isSyncing) {
        this.sync({ summaryOnly: true });
      }
    }, SYNC_INTERVAL);
  }

  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('⏹️ Stopped automatic sync');
    }
  }

  // Main sync function
  async sync(options: SyncOptions = {}): Promise<SyncResult> {
    // Check if database is initialized
    if (!isDatabaseInitialized()) {
      console.log('⏭️ Database not initialized - skipping sync');
      return { success: false, message: 'Database not initialized' };
    }

    if (this.isSyncing) {
      console.log('⏳ Sync already in progress');
      return { success: false, message: 'Sync already in progress' };
    }

    if (!navigator.onLine) {
      console.log('📡 Offline - skipping sync');
      return { success: false, message: 'Device is offline' };
    }

    this.isSyncing = true;
    this.notifyListeners({ status: 'syncing', message: 'Syncing data...' });

    const startTime = Date.now();
    let result: SyncResult;

    try {
      if (options.summaryOnly) {
        result = await this.syncSummariesOnly();
      } else {
        result = await this.syncAllData();
      }

      this.lastSyncTime = new Date();
      this.notifyListeners({
        status: 'success',
        message: 'Sync completed',
        lastSync: this.lastSyncTime,
      });

      // Log successful sync (only if database is initialized)
      if (isDatabaseInitialized()) {
        await db.addSyncLog({
          type: options.summaryOnly ? 'summary' : 'full',
          status: 'success',
          recordCount: result.syncedCount || 0,
        });
      }

      console.log(`✅ Sync completed in ${Date.now() - startTime}ms`);
      return result;
    } catch (error: any) {
      console.error('❌ Sync failed:', error);
      
      this.notifyListeners({
        status: 'error',
        message: error.message || 'Sync failed',
      });

      // Log failed sync (only if database is initialized)
      if (isDatabaseInitialized()) {
        await db.addSyncLog({
          type: options.summaryOnly ? 'summary' : 'full',
          status: 'failed',
          recordCount: 0,
          errorMessage: error.message,
        });
      }

      return {
        success: false,
        message: error.message || 'Sync failed',
      };
    } finally {
      this.isSyncing = false;
    }
  }

  // Sync only sales summaries (lightweight)
  private async syncSummariesOnly(): Promise<SyncResult> {
    console.log('📊 Syncing sales summaries...');
    
    const unsyncedSummaries = await db.getUnsyncedSummaries();
    
    if (unsyncedSummaries.length === 0) {
      console.log('✓ No summaries to sync');
      return { success: true, message: 'No summaries to sync', syncedCount: 0 };
    }

    // Simulate API call (replace with actual backend call)
    const syncedIds = await this.sendToBackend('/api/sync/summaries', {
      summaries: unsyncedSummaries,
    });

    // Mark as synced
    await db.markAsSynced('sales_summary', syncedIds);

    console.log(`✅ Synced ${syncedIds.length} summaries`);
    return {
      success: true,
      message: `Synced ${syncedIds.length} summaries`,
      syncedCount: syncedIds.length,
    };
  }

  // Sync all unsynced data (full sync)
  private async syncAllData(): Promise<SyncResult> {
    console.log('🔄 Starting full sync...');
    
    let totalSynced = 0;

    // 1. Sync inventory changes
    const inventoryItems = await db.getInventoryItems();
    const unsyncedInventory = inventoryItems.filter((item: any) => !item.synced);
    
    if (unsyncedInventory.length > 0) {
      const syncedInventoryIds = await this.sendToBackend('/api/sync/inventory', {
        items: unsyncedInventory,
      });
      await db.markAsSynced('inventory', syncedInventoryIds);
      totalSynced += syncedInventoryIds.length;
      console.log(`✓ Synced ${syncedInventoryIds.length} inventory items`);
    }

    // 2. Sync transactions (optional - user can choose to keep local)
    const unsyncedTransactions = await db.getUnsyncedTransactions();
    if (unsyncedTransactions.length > 0) {
      // Only sync transaction metadata, not full details
      const transactionMetadata = unsyncedTransactions.map((txn: any) => ({
        id: txn.id,
        transactionNumber: txn.transactionNumber,
        total: txn.total,
        paymentMethod: txn.paymentMethod,
        timestamp: txn.timestamp,
        userId: txn.userId,
      }));

      const syncedTxnIds = await this.sendToBackend('/api/sync/transactions', {
        transactions: transactionMetadata,
      });
      await db.markAsSynced('transactions', syncedTxnIds);
      totalSynced += syncedTxnIds.length;
      console.log(`✓ Synced ${syncedTxnIds.length} transaction summaries`);
    }

    // 3. Sync daily summaries
    const unsyncedSummaries = await db.getUnsyncedSummaries();
    if (unsyncedSummaries.length > 0) {
      const syncedSummaryIds = await this.sendToBackend('/api/sync/summaries', {
        summaries: unsyncedSummaries,
      });
      await db.markAsSynced('sales_summary', syncedSummaryIds);
      totalSynced += syncedSummaryIds.length;
      console.log(`✓ Synced ${syncedSummaryIds.length} daily summaries`);
    }

    return {
      success: true,
      message: `Full sync completed - ${totalSynced} records`,
      syncedCount: totalSynced,
    };
  }

  // Send data to backend (with retry logic)
  private async sendToBackend(
    endpoint: string,
    data: any,
    attempt = 1
  ): Promise<string[]> {
    try {
      // Simulate API call (replace with actual fetch)
      console.log(`📤 Sending to ${endpoint} (attempt ${attempt})`);
      
      // In production, this would be:
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();
      // return result.syncedIds;

      // Mock: simulate successful sync
      await this.delay(500);
      
      // Return IDs of synced items
      if (data.summaries) {
        return data.summaries.map((s: any) => s.id);
      }
      if (data.items) {
        return data.items.map((i: any) => i.id);
      }
      if (data.transactions) {
        return data.transactions.map((t: any) => t.id);
      }
      return [];
    } catch (error: any) {
      if (attempt < MAX_RETRY_ATTEMPTS) {
        console.log(`⚠️ Retry ${attempt}/${MAX_RETRY_ATTEMPTS}...`);
        await this.delay(RETRY_DELAY * attempt);
        return this.sendToBackend(endpoint, data, attempt + 1);
      }
      throw new Error(`Failed to sync after ${MAX_RETRY_ATTEMPTS} attempts: ${error.message}`);
    }
  }

  // Handle online event
  private handleOnline() {
    console.log('📡 Network online - attempting sync');
    this.notifyListeners({ status: 'online', message: 'Connected to network' });
    
    // Sync immediately when coming online
    setTimeout(() => {
      this.sync({ summaryOnly: true });
    }, 1000);
  }

  // Handle offline event
  private handleOffline() {
    console.log('📡 Network offline');
    this.notifyListeners({ status: 'offline', message: 'No network connection' });
  }

  // Export full backup
  async exportFullBackup(): Promise<Blob> {
    console.log('💾 Exporting full backup...');
    
    const data = await db.exportAllData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });

    // Log backup export (only if database is initialized)
    if (isDatabaseInitialized()) {
      await db.addSyncLog({
        type: 'full-backup',
        status: 'success',
        recordCount: data.transactions.length + data.inventory.length,
      });
    }

    console.log('✅ Backup exported');
    return blob;
  }

  // Upload backup to cloud (explicit user action)
  async uploadBackupToCloud(): Promise<boolean> {
    console.log('☁️ Uploading backup to cloud...');
    
    try {
      const backup = await this.exportFullBackup();
      
      // Simulate upload (replace with actual cloud storage API)
      // const formData = new FormData();
      // formData.append('backup', backup, `backup_${Date.now()}.json`);
      // await fetch('/api/backup/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      await this.delay(2000);
      console.log('✅ Backup uploaded to cloud');
      return true;
    } catch (error) {
      console.error('❌ Failed to upload backup:', error);
      return false;
    }
  }

  // Subscribe to sync status changes
  onSyncStatusChange(callback: (status: SyncStatus) => void) {
    this.syncListeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.syncListeners = this.syncListeners.filter((cb) => cb !== callback);
    };
  }

  private notifyListeners(status: SyncStatus) {
    this.syncListeners.forEach((callback) => callback(status));
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get sync info
  getSyncInfo() {
    return {
      isOnline: navigator.onLine,
      isSyncing: this.isSyncing,
      lastSyncTime: this.lastSyncTime,
      autoSyncEnabled: this.syncInterval !== null,
    };
  }
}

// Types
interface SyncResult {
  success: boolean;
  message: string;
  syncedCount?: number;
}

interface SyncStatus {
  status: 'syncing' | 'success' | 'error' | 'online' | 'offline';
  message: string;
  lastSync?: Date;
}

// Export singleton instance
export const syncManager = new SyncManager();