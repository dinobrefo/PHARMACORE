import { useEffect, useState } from 'react';

interface PendingSale {
  id: string;
  timestamp: number;
  data: any;
}

export function useOfflineSync() {
  const [pendingSales, setPendingSales] = useState<PendingSale[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Load pending sales from localStorage
    const loadPendingSales = () => {
      const stored = localStorage.getItem('pending_sales');
      if (stored) {
        setPendingSales(JSON.parse(stored));
      }
    };

    loadPendingSales();

    // Listen for online event to sync
    const handleOnline = async () => {
      if (pendingSales.length > 0) {
        await syncPendingSales();
      }
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [pendingSales.length]);

  const addPendingSale = (sale: any) => {
    const newSale: PendingSale = {
      id: `offline_${Date.now()}`,
      timestamp: Date.now(),
      data: sale,
    };

    const updated = [...pendingSales, newSale];
    setPendingSales(updated);
    localStorage.setItem('pending_sales', JSON.stringify(updated));

    // Request background sync if available
    if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready
        .then((registration) => {
          return (registration as any).sync.register('sync-sales');
        })
        .catch((error) => {
          console.log('Background sync not available:', error.message);
        });
    }
  };

  const syncPendingSales = async () => {
    if (pendingSales.length === 0 || !navigator.onLine) return;

    setIsSyncing(true);

    try {
      // In a real app, you would send these to your backend
      console.log('Syncing pending sales:', pendingSales);

      // Clear pending sales after successful sync
      setPendingSales([]);
      localStorage.removeItem('pending_sales');
    } catch (error) {
      console.error('Failed to sync sales:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const removePendingSale = (id: string) => {
    const updated = pendingSales.filter((sale) => sale.id !== id);
    setPendingSales(updated);
    localStorage.setItem('pending_sales', JSON.stringify(updated));
  };

  return {
    pendingSales,
    isSyncing,
    addPendingSale,
    syncPendingSales,
    removePendingSale,
  };
}