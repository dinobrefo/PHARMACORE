import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';

// Conditionally add dev mode plugin
let devModeEnabled = false;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  try {
    const { RxDBDevModePlugin, disableWarnings } = require('rxdb/plugins/dev-mode');
    addRxPlugin(RxDBDevModePlugin);
    disableWarnings();
    devModeEnabled = true;
    console.log('📦 RxDB dev-mode enabled (warnings disabled)');
  } catch (error) {
    console.warn('Could not load RxDB dev-mode plugin:', error);
  }
}

// Database schemas
const inventorySchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    name: { type: 'string' },
    genericName: { type: 'string' },
    category: { type: 'string', maxLength: 100 },
    manufacturer: { type: 'string' },
    sku: { type: 'string', maxLength: 100 },
    quantity: { type: 'number' },
    reorderLevel: { type: 'number' },
    unitPrice: { type: 'number' },
    expiryDate: { type: 'string' },
    batchNumber: { type: 'string' },
    lastUpdated: { type: 'string', maxLength: 50 },
    isSynced: { type: 'boolean' },
  },
  required: ['id', 'name', 'quantity', 'unitPrice'],
  indexes: ['category', 'sku', 'isSynced', 'lastUpdated'],
};

const transactionSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    transactionNumber: { type: 'string' },
    items: { type: 'array' },
    subtotal: { type: 'number' },
    tax: { type: 'number' },
    discount: { type: 'number' },
    total: { type: 'number' },
    paymentMethod: { type: 'string', maxLength: 50 },
    cashAmount: { type: 'number' },
    mobileMoneyAmount: { type: 'number' },
    change: { type: 'number' },
    customerName: { type: 'string' },
    timestamp: { type: 'string', maxLength: 50 },
    userId: { type: 'string', maxLength: 100 },
    userName: { type: 'string' },
    isSynced: { type: 'boolean' },
    lastSyncedAt: { type: 'string' },
  },
  required: ['id', 'transactionNumber', 'items', 'total', 'paymentMethod', 'timestamp'],
  indexes: ['timestamp', 'isSynced', 'userId', 'paymentMethod'],
};

const salesSummarySchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    date: { type: 'string', maxLength: 50 },
    totalSales: { type: 'number' },
    totalTransactions: { type: 'number' },
    cashSales: { type: 'number' },
    mobileMoneyMoney: { type: 'number' },
    averageTransaction: { type: 'number' },
    topSellingItems: { type: 'array' },
    userId: { type: 'string', maxLength: 100 },
    userName: { type: 'string' },
    isSynced: { type: 'boolean' },
    lastSyncedAt: { type: 'string' },
  },
  required: ['id', 'date', 'totalSales', 'totalTransactions'],
  indexes: ['date', 'isSynced', 'userId'],
};

const userSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    name: { type: 'string' },
    email: { type: 'string', maxLength: 200 },
    role: { type: 'string' },
    tenantId: { type: 'string', maxLength: 100 },
    tenantName: { type: 'string' },
    lastLogin: { type: 'string' },
    shiftStart: { type: 'string' },
    shiftEnd: { type: 'string' },
  },
  required: ['id', 'email', 'role'],
  indexes: ['email', 'tenantId'],
};

const syncLogSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    timestamp: { type: 'string', maxLength: 50 },
    type: { type: 'string', maxLength: 50 }, // 'summary', 'inventory', 'full-backup'
    status: { type: 'string', maxLength: 50 }, // 'success', 'failed', 'pending'
    recordCount: { type: 'number' },
    errorMessage: { type: 'string' },
  },
  required: ['id', 'timestamp', 'type', 'status'],
  indexes: ['timestamp', 'type', 'status'],
};

// Database instance
let dbInstance: any = null;

export async function initializeDatabase(tenantId: string) {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    // Wrap storage with validator when dev-mode is enabled
    const storage = devModeEnabled 
      ? wrappedValidateAjvStorage({ storage: getRxStorageDexie() })
      : getRxStorageDexie();

    // Create database with tenant-specific name
    const db = await createRxDatabase({
      name: `pharmacore_${tenantId}`,
      storage,
      multiInstance: true,
      ignoreDuplicate: true,
    });

    // Add collections
    await db.addCollections({
      inventory: {
        schema: inventorySchema,
      },
      transactions: {
        schema: transactionSchema,
      },
      sales_summary: {
        schema: salesSummarySchema,
      },
      users: {
        schema: userSchema,
      },
      sync_logs: {
        schema: syncLogSchema,
      },
    });

    dbInstance = db;
    console.log('✅ RxDB initialized successfully for tenant:', tenantId);
    return db;
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return dbInstance;
}

export function isDatabaseInitialized() {
  return dbInstance !== null;
}

export async function destroyDatabase() {
  if (dbInstance) {
    await dbInstance.destroy();
    dbInstance = null;
  }
}

// Helper functions for common operations
export const db = {
  // Inventory operations
  async addInventoryItem(item: any) {
    const db = getDatabase();
    const doc = await db.inventory.insert({
      ...item,
      id: item.id || `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      lastUpdated: new Date().toISOString(),
      isSynced: false,
    });
    return doc;
  },

  async updateInventoryItem(id: string, updates: any) {
    const db = getDatabase();
    const doc = await db.inventory.findOne(id).exec();
    if (doc) {
      await doc.patch({
        ...updates,
        lastUpdated: new Date().toISOString(),
        isSynced: false,
      });
      return doc;
    }
    return null;
  },

  async getInventoryItems() {
    const db = getDatabase();
    const items = await db.inventory.find().exec();
    return items.map((doc: any) => doc.toJSON());
  },

  async searchInventory(query: string) {
    const db = getDatabase();
    const items = await db.inventory.find().exec();
    const searchLower = query.toLowerCase();
    return items
      .map((doc: any) => doc.toJSON())
      .filter((item: any) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.sku.toLowerCase().includes(searchLower) ||
        (item.genericName && item.genericName.toLowerCase().includes(searchLower))
      );
  },

  // Transaction operations
  async addTransaction(transaction: any) {
    const db = getDatabase();
    const doc = await db.transactions.insert({
      ...transaction,
      id: transaction.id || `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: transaction.timestamp || new Date().toISOString(),
      isSynced: false,
    });
    return doc;
  },

  async getTransactions(startDate?: string, endDate?: string) {
    const db = getDatabase();
    let query = db.transactions.find();

    if (startDate) {
      query = query.where('timestamp').gte(startDate);
    }
    if (endDate) {
      query = query.where('timestamp').lte(endDate);
    }

    const transactions = await query.sort({ timestamp: 'desc' }).exec();
    return transactions.map((doc: any) => doc.toJSON());
  },

  async getUnsyncedTransactions() {
    const db = getDatabase();
    const transactions = await db.transactions
      .find()
      .where('isSynced')
      .equals(false)
      .exec();
    return transactions.map((doc: any) => doc.toJSON());
  },

  // Sales summary operations
  async saveDailySummary(summary: any) {
    const db = getDatabase();
    const doc = await db.sales_summary.insert({
      ...summary,
      id: summary.id || `summary_${Date.now()}`,
      isSynced: false,
    });
    return doc;
  },

  async getDailySummary(date: string) {
    const db = getDatabase();
    const summary = await db.sales_summary
      .findOne()
      .where('date')
      .equals(date)
      .exec();
    return summary ? summary.toJSON() : null;
  },

  async getUnsyncedSummaries() {
    const db = getDatabase();
    const summaries = await db.sales_summary
      .find()
      .where('isSynced')
      .equals(false)
      .exec();
    return summaries.map((doc: any) => doc.toJSON());
  },

  // Mark items as synced
  async markAsSynced(collection: string, ids: string[]) {
    const db = getDatabase();
    const col = db[collection];
    
    for (const id of ids) {
      const doc = await col.findOne(id).exec();
      if (doc) {
        await doc.patch({
          isSynced: true,
          lastSyncedAt: new Date().toISOString(),
        });
      }
    }
  },

  // Sync logs
  async addSyncLog(log: any) {
    const db = getDatabase();
    await db.sync_logs.insert({
      ...log,
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  },

  async getSyncLogs(limit = 50) {
    const db = getDatabase();
    const logs = await db.sync_logs
      .find()
      .sort({ timestamp: 'desc' })
      .limit(limit)
      .exec();
    return logs.map((doc: any) => doc.toJSON());
  },

  // Storage statistics
  async getStorageStats() {
    const db = getDatabase();
    
    const inventoryCount = await db.inventory.count().exec();
    const transactionCount = await db.transactions.count().exec();
    const summaryCount = await db.sales_summary.count().exec();
    const unsyncedTransactions = await db.transactions
      .find()
      .where('isSynced')
      .equals(false)
      .count()
      .exec();

    return {
      inventoryCount,
      transactionCount,
      summaryCount,
      unsyncedTransactions,
      totalRecords: inventoryCount + transactionCount + summaryCount,
    };
  },

  // Export data for backup
  async exportAllData() {
    const db = getDatabase();
    
    const inventory = await this.getInventoryItems();
    const transactions = await this.getTransactions();
    const summaries = await db.sales_summary.find().exec();
    const syncLogs = await this.getSyncLogs(100);

    return {
      exportDate: new Date().toISOString(),
      inventory,
      transactions,
      summaries: summaries.map((doc: any) => doc.toJSON()),
      syncLogs,
    };
  },

  // Clear old data (for maintenance)
  async clearOldTransactions(daysToKeep = 90) {
    const db = getDatabase();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const oldTransactions = await db.transactions
      .find()
      .where('timestamp')
      .lt(cutoffDate.toISOString())
      .where('isSynced')
      .equals(true)
      .exec();

    for (const doc of oldTransactions) {
      await doc.remove();
    }

    return oldTransactions.length;
  },
};