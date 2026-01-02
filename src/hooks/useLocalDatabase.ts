import { useState, useEffect } from 'react';
import { db } from '../services/database';
import { syncManager } from '../services/syncManager';

// Hook for inventory management
export function useInventory() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const items = await db.getInventoryItems();
      setInventory(items);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: any) => {
    try {
      await db.addInventoryItem(item);
      await loadInventory();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateItem = async (id: string, updates: any) => {
    try {
      await db.updateInventoryItem(id, updates);
      await loadInventory();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const searchItems = async (query: string) => {
    try {
      const results = await db.searchInventory(query);
      return results;
    } catch (err: any) {
      console.error('Search failed:', err);
      return [];
    }
  };

  return {
    inventory,
    loading,
    error,
    addItem,
    updateItem,
    searchItems,
    refresh: loadInventory,
  };
}

// Hook for transactions/POS
export function useTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async (startDate?: string, endDate?: string) => {
    try {
      setLoading(true);
      const txns = await db.getTransactions(startDate, endDate);
      setTransactions(txns);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: any) => {
    try {
      await db.addTransaction(transaction);
      
      // Update inventory quantities
      for (const item of transaction.items) {
        await db.updateInventoryItem(item.id, {
          quantity: item.remainingQuantity,
        });
      }

      await loadTransactions();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const getTodayTransactions = async () => {
    const today = new Date().toISOString().split('T')[0];
    return await db.getTransactions(`${today}T00:00:00`, `${today}T23:59:59`);
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    getTodayTransactions,
    refresh: loadTransactions,
  };
}

// Hook for sync status
export function useSyncStatus() {
  const [syncInfo, setSyncInfo] = useState(syncManager.getSyncInfo());
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const unsubscribe = syncManager.onSyncStatusChange((status) => {
      setSyncInfo(syncManager.getSyncInfo());
      setIsSyncing(status.status === 'syncing');
    });

    // Update sync info periodically
    const interval = setInterval(() => {
      setSyncInfo(syncManager.getSyncInfo());
    }, 10000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const manualSync = async () => {
    setIsSyncing(true);
    await syncManager.sync({ summaryOnly: false });
  };

  return {
    ...syncInfo,
    isSyncing,
    manualSync,
  };
}

// Hook for network status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Hook for storage statistics
export function useStorageStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();

    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const data = await db.getStorageStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load storage stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refresh: loadStats };
}

// Hook for daily sales summary
export function useDailySummary(date?: string) {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, [date]);

  const loadSummary = async () => {
    try {
      setLoading(true);
      const targetDate = date || new Date().toISOString().split('T')[0];
      const data = await db.getDailySummary(targetDate);
      setSummary(data);
    } catch (err) {
      console.error('Failed to load daily summary:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = async () => {
    try {
      const targetDate = date || new Date().toISOString().split('T')[0];
      const transactions = await db.getTransactions(
        `${targetDate}T00:00:00`,
        `${targetDate}T23:59:59`
      );

      if (transactions.length === 0) {
        return null;
      }

      const totalSales = transactions.reduce((sum: number, txn: any) => sum + txn.total, 0);
      const cashSales = transactions
        .filter((txn: any) => txn.paymentMethod === 'cash' || txn.cashAmount > 0)
        .reduce((sum: number, txn: any) => sum + (txn.cashAmount || txn.total), 0);
      const mobileMoneyMoney = transactions
        .filter((txn: any) => txn.paymentMethod === 'mobileMoney' || txn.mobileMoneyAmount > 0)
        .reduce((sum: number, txn: any) => sum + (txn.mobileMoneyAmount || txn.total), 0);

      // Calculate top selling items
      const itemCounts: any = {};
      transactions.forEach((txn: any) => {
        txn.items.forEach((item: any) => {
          if (!itemCounts[item.name]) {
            itemCounts[item.name] = { name: item.name, quantity: 0, revenue: 0 };
          }
          itemCounts[item.name].quantity += item.quantity;
          itemCounts[item.name].revenue += item.quantity * item.price;
        });
      });

      const topSellingItems = Object.values(itemCounts)
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 5);

      const summaryData = {
        date: targetDate,
        totalSales,
        totalTransactions: transactions.length,
        cashSales,
        mobileMoneyMoney,
        averageTransaction: totalSales / transactions.length,
        topSellingItems,
        userId: transactions[0]?.userId,
        userName: transactions[0]?.userName,
      };

      await db.saveDailySummary(summaryData);
      setSummary(summaryData);
      return summaryData;
    } catch (err) {
      console.error('Failed to calculate summary:', err);
      return null;
    }
  };

  return {
    summary,
    loading,
    calculateSummary,
    refresh: loadSummary,
  };
}
