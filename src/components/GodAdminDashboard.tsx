import { useState } from 'react';
import { 
  Shield, 
  Building2, 
  Database, 
  Activity, 
  Settings, 
  LogOut,
  Search,
  Plus,
  Eye,
  Pause,
  Play,
  Archive,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  UserCog,
  Key,
  Pill,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  CreditCard,
  Receipt,
  TrendingDown,
  Menu,
  X
} from 'lucide-react';
import { AddTenantModal } from './AddTenantModal';
import { AddDrugModal } from './AddDrugModal';
import { ConfirmDialog } from './ConfirmDialog';
import { GodAdminSettings } from './GodAdminSettings';

interface GodAdminDashboardProps {
  user: any;
  onLogout: () => void;
}

// Mock tenant data
const MOCK_TENANTS = [
  {
    id: 'pharma-1',
    name: 'HealthPlus Pharmacy',
    ownerEmail: 'admin@healthplus.com',
    status: 'active',
    plan: 'Professional',
    mrr: 149.99,
    users: 12,
    inventoryItems: 847,
    transactions: 2341,
    signupDate: '2024-01-15',
    lastActive: '2024-12-29 14:23',
    storage: '2.3 GB',
    region: 'Accra',
  },
  {
    id: 'pharma-2',
    name: 'CareRx Pharmacy',
    ownerEmail: 'admin@carerx.com',
    status: 'active',
    plan: 'Enterprise',
    mrr: 299.99,
    users: 24,
    inventoryItems: 1523,
    transactions: 4892,
    signupDate: '2023-11-08',
    lastActive: '2024-12-29 15:41',
    storage: '4.7 GB',
    region: 'Kumasi',
  },
  {
    id: 'pharma-3',
    name: 'WellnessMed Pharmacy',
    ownerEmail: 'admin@wellnessmed.com',
    status: 'trial',
    plan: 'Trial',
    mrr: 0,
    users: 3,
    inventoryItems: 124,
    transactions: 87,
    signupDate: '2024-12-20',
    lastActive: '2024-12-28 09:15',
    storage: '0.3 GB',
    region: 'Takoradi',
  },
  {
    id: 'pharma-4',
    name: 'MediCare Plus',
    ownerEmail: 'admin@medicareplus.com',
    status: 'paused',
    plan: 'Professional',
    mrr: 0,
    users: 8,
    inventoryItems: 432,
    transactions: 1234,
    signupDate: '2024-06-12',
    lastActive: '2024-12-15 18:30',
    storage: '1.2 GB',
    region: 'Tema',
  },
  {
    id: 'pharma-5',
    name: 'QuickMeds Pharmacy',
    ownerEmail: 'admin@quickmeds.com',
    status: 'active',
    plan: 'Basic',
    mrr: 79.99,
    users: 5,
    inventoryItems: 312,
    transactions: 923,
    signupDate: '2024-08-03',
    lastActive: '2024-12-29 11:05',
    storage: '0.8 GB',
    region: 'Cape Coast',
  },
];

// Mock global drug catalog
const MOCK_GLOBAL_DRUGS = [
  {
    id: 'drug-001',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    category: 'Analgesics',
    manufacturer: 'Generic',
    standardSku: 'PAR-500',
    usageCount: 847,
  },
  {
    id: 'drug-002',
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin',
    category: 'Antibiotics',
    manufacturer: 'Generic',
    standardSku: 'AMX-500',
    usageCount: 623,
  },
  {
    id: 'drug-003',
    name: 'Metformin 850mg',
    genericName: 'Metformin HCl',
    category: 'Diabetes',
    manufacturer: 'Generic',
    standardSku: 'MET-850',
    usageCount: 512,
  },
];

export function GodAdminDashboard({ user, onLogout }: GodAdminDashboardProps) {
  const [activeView, setActiveView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [showNewTenantModal, setShowNewTenantModal] = useState(false);
  const [showNewDrugModal, setShowNewDrugModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmTenantId, setConfirmTenantId] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Calculate platform metrics
  const totalTenants = MOCK_TENANTS.length;
  const activeTenants = MOCK_TENANTS.filter(t => t.status === 'active').length;
  const totalMRR = MOCK_TENANTS.reduce((sum, t) => sum + t.mrr, 0);
  const totalUsers = MOCK_TENANTS.reduce((sum, t) => sum + t.users, 0);
  const totalTransactions = MOCK_TENANTS.reduce((sum, t) => sum + t.transactions, 0);

  const getStatusBadge = (status: string) => {
    const badges: any = {
      active: 'bg-green-500/10 text-green-400 border-green-500/20',
      trial: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      paused: 'bg-red-500/10 text-red-400 border-red-500/20',
      archived: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return badges[status] || badges.active;
  };

  const getPlanBadge = (plan: string) => {
    const badges: any = {
      Basic: 'bg-gray-500/10 text-gray-300 border-gray-500/20',
      Professional: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      Enterprise: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      Trial: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    };
    return badges[plan] || badges.Basic;
  };

  const handleTenantAction = (tenantId: string, action: string) => {
    console.log(`Action: ${action} on tenant ${tenantId}`);
    // In production, this would make API calls
    setConfirmAction(action);
    setConfirmTenantId(tenantId);
    setShowConfirmDialog(true);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Platform Health KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-green-400 flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4" />
              +12%
            </span>
          </div>
          <p className="text-slate-400 mb-1">Total Pharmacies</p>
          <p className="text-white text-3xl">{totalTenants}</p>
          <p className="text-slate-500 text-sm mt-1">{activeTenants} active</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4" />
              +8.3%
            </span>
          </div>
          <p className="text-slate-400 mb-1">Monthly Recurring Revenue</p>
          <p className="text-white text-3xl">GH₵ {totalMRR.toFixed(2)}</p>
          <p className="text-slate-500 text-sm mt-1">From {activeTenants} subscriptions</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-green-400 flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4" />
              +15%
            </span>
          </div>
          <p className="text-slate-400 mb-1">Total Users</p>
          <p className="text-white text-3xl">{totalUsers}</p>
          <p className="text-slate-500 text-sm mt-1">Across all pharmacies</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-green-400 flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4" />
              +22%
            </span>
          </div>
          <p className="text-slate-400 mb-1">Total Transactions</p>
          <p className="text-white text-3xl">{totalTransactions.toLocaleString()}</p>
          <p className="text-slate-500 text-sm mt-1">This month</p>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-400" />
          System Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400">API Uptime</p>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-white text-2xl">99.98%</p>
            <p className="text-slate-500 text-sm mt-1">Last 30 days</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400">Avg Response Time</p>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-white text-2xl">124ms</p>
            <p className="text-slate-500 text-sm mt-1">Excellent performance</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400">Error Rate</p>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-white text-2xl">0.02%</p>
            <p className="text-slate-500 text-sm mt-1">Within target</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-white mb-6">Recent Platform Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New Signup', tenant: 'WellnessMed Pharmacy', time: '2 hours ago', icon: Plus, color: 'green' },
            { action: 'Subscription Upgraded', tenant: 'CareRx Pharmacy', time: '5 hours ago', icon: TrendingUp, color: 'blue' },
            { action: 'Payment Received', tenant: 'HealthPlus Pharmacy', time: '1 day ago', icon: DollarSign, color: 'green' },
            { action: 'Support Ticket', tenant: 'QuickMeds Pharmacy', time: '1 day ago', icon: AlertCircle, color: 'amber' },
          ].map((activity, idx) => {
            const Icon = activity.icon;
            return (
              <div key={idx} className="flex items-center gap-4 p-3 hover:bg-slate-700/30 rounded-lg transition-colors">
                <div className={`w-10 h-10 bg-${activity.color}-500/10 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${activity.color}-400`} />
                </div>
                <div className="flex-1">
                  <p className="text-white">{activity.action}</p>
                  <p className="text-slate-400 text-sm">{activity.tenant}</p>
                </div>
                <p className="text-slate-500 text-sm">{activity.time}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTenants = () => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-1">Tenant Management</h2>
          <p className="text-slate-400">Manage all pharmacy organizations</p>
        </div>
        <button
          onClick={() => setShowNewTenantModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Pharmacy
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search pharmacies..."
          className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Tenants Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr className="border-b border-slate-700">
                <th className="px-6 py-4 text-left text-slate-400">Pharmacy</th>
                <th className="px-6 py-4 text-left text-slate-400">Status</th>
                <th className="px-6 py-4 text-left text-slate-400">Plan</th>
                <th className="px-6 py-4 text-left text-slate-400">MRR</th>
                <th className="px-6 py-4 text-left text-slate-400">Users</th>
                <th className="px-6 py-4 text-left text-slate-400">Last Active</th>
                <th className="px-6 py-4 text-left text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TENANTS.map((tenant) => (
                <tr
                  key={tenant.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{tenant.name}</p>
                      <p className="text-slate-400 text-sm">{tenant.ownerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize border ${getStatusBadge(tenant.status)}`}>
                      {tenant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm border ${getPlanBadge(tenant.plan)}`}>
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">
                    {tenant.mrr > 0 ? `GH₵ ${tenant.mrr.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-white">{tenant.users}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{tenant.lastActive}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedTenant(tenant)}
                        className="p-2 hover:bg-slate-600/30 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-slate-400" />
                      </button>
                      {tenant.status === 'active' && (
                        <button
                          onClick={() => handleTenantAction(tenant.id, 'pause')}
                          className="p-2 hover:bg-slate-600/30 rounded-lg transition-colors"
                          title="Pause Service"
                        >
                          <Pause className="w-4 h-4 text-amber-400" />
                        </button>
                      )}
                      {tenant.status === 'paused' && (
                        <button
                          onClick={() => handleTenantAction(tenant.id, 'activate')}
                          className="p-2 hover:bg-slate-600/30 rounded-lg transition-colors"
                          title="Activate Service"
                        >
                          <Play className="w-4 h-4 text-green-400" />
                        </button>
                      )}
                      <button
                        onClick={() => handleTenantAction(tenant.id, 'impersonate')}
                        className="p-2 hover:bg-slate-600/30 rounded-lg transition-colors"
                        title="Login As Owner"
                      >
                        <UserCog className="w-4 h-4 text-blue-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMasterCatalog = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-1">Global Drug Catalog</h2>
          <p className="text-slate-400">Master database shared across all pharmacies</p>
        </div>
        <button
          onClick={() => setShowNewDrugModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Drug
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <p className="text-slate-400 mb-2">Total Drugs</p>
          <p className="text-white text-3xl">{MOCK_GLOBAL_DRUGS.length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <p className="text-slate-400 mb-2">Categories</p>
          <p className="text-white text-3xl">12</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <p className="text-slate-400 mb-2">Total Usage</p>
          <p className="text-white text-3xl">1,982</p>
        </div>
      </div>

      {/* Drug List */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr className="border-b border-slate-700">
                <th className="px-6 py-4 text-left text-slate-400">Drug Name</th>
                <th className="px-6 py-4 text-left text-slate-400">Generic Name</th>
                <th className="px-6 py-4 text-left text-slate-400">Category</th>
                <th className="px-6 py-4 text-left text-slate-400">SKU</th>
                <th className="px-6 py-4 text-left text-slate-400">Usage Count</th>
                <th className="px-6 py-4 text-left text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_GLOBAL_DRUGS.map((drug) => (
                <tr
                  key={drug.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                        <Pill className="w-5 h-5 text-purple-400" />
                      </div>
                      <p className="text-white font-medium">{drug.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{drug.genericName}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {drug.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{drug.standardSku}</td>
                  <td className="px-6 py-4 text-white">{drug.usageCount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-600/30 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-slate-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-600/30 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSystemLogs = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-white mb-1">System Logs & Activity</h2>
        <p className="text-slate-400">Monitor platform-wide events and errors</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {['All', 'Logins', 'Transactions', 'Errors', 'API Calls', 'Payments'].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700 whitespace-nowrap transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Logs */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
        <div className="space-y-3">
          {[
            { type: 'info', message: 'User login: admin@healthplus.com', time: '14:23:45', tenant: 'HealthPlus Pharmacy' },
            { type: 'success', message: 'Payment processed: GH₵ 149.99', time: '14:18:12', tenant: 'CareRx Pharmacy' },
            { type: 'warning', message: 'High API usage detected', time: '14:05:33', tenant: 'WellnessMed Pharmacy' },
            { type: 'error', message: 'Database connection timeout', time: '13:47:21', tenant: 'System' },
            { type: 'info', message: 'Backup completed successfully', time: '13:30:00', tenant: 'System' },
          ].map((log, idx) => {
            const colors: any = {
              info: 'text-blue-400',
              success: 'text-green-400',
              warning: 'text-amber-400',
              error: 'text-red-400',
            };
            return (
              <div key={idx} className="flex items-start gap-4 p-3 bg-slate-900/30 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${colors[log.type].replace('text-', 'bg-')}`} />
                <div className="flex-1">
                  <p className="text-white">{log.message}</p>
                  <p className="text-slate-400 text-sm mt-1">{log.tenant}</p>
                </div>
                <p className="text-slate-500 text-sm">{log.time}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Top Bar */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-40">
        <div className="px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-bold">Pharmacore GodAdmin</h1>
                <p className="text-slate-400 text-sm hidden md:block">System Control Panel</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* User Info - Hidden on smallest screens */}
            <div className="hidden md:flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-white text-sm">{user.name}</p>
                <p className="text-slate-400 text-xs">God Administrator</p>
              </div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] 
          w-64 bg-slate-900/95 lg:bg-slate-900/50 backdrop-blur-sm border-r border-slate-700/50 
          p-4 z-50 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          <nav className="space-y-2 mt-12 lg:mt-0">
            {[
              { id: 'overview', icon: BarChart3, label: 'Overview' },
              { id: 'tenants', icon: Building2, label: 'Tenants' },
              { id: 'catalog', icon: Database, label: 'Master Catalog' },
              { id: 'logs', icon: Activity, label: 'System Logs' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setSidebarOpen(false); // Close sidebar on mobile after selection
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full lg:w-auto overflow-x-hidden">
          {activeView === 'overview' && renderOverview()}
          {activeView === 'tenants' && renderTenants()}
          {activeView === 'catalog' && renderMasterCatalog()}
          {activeView === 'logs' && renderSystemLogs()}
          {activeView === 'settings' && (
            <GodAdminSettings
              onSave={(settings) => {
                console.log('Settings saved:', settings);
              }}
            />
          )}
        </main>
      </div>

      {/* Tenant Detail Modal */}
      {selectedTenant && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-white mb-1">{selectedTenant.name}</h2>
                <p className="text-slate-400">{selectedTenant.id}</p>
              </div>
              <button
                onClick={() => setSelectedTenant(null)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            {/* Action Bar */}
            <div className="border-b border-slate-700 p-6">
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <UserCog className="w-4 h-4" />
                  Login As Admin
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                  <Key className="w-4 h-4" />
                  Reset Password
                </button>
                {selectedTenant.status === 'active' ? (
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
                    <Pause className="w-4 h-4" />
                    Pause Service
                  </button>
                ) : (
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                    Activate
                  </button>
                )}
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/20 rounded-lg transition-colors">
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-white mb-4">Organization Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Owner Email</p>
                    <p className="text-white">{selectedTenant.ownerEmail}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Signup Date</p>
                    <p className="text-white">{selectedTenant.signupDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Region</p>
                    <p className="text-white">{selectedTenant.region}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Last Active</p>
                    <p className="text-white">{selectedTenant.lastActive}</p>
                  </div>
                </div>
              </div>

              {/* Usage Stats */}
              <div>
                <h3 className="text-white mb-4">Usage Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-slate-400 text-sm mb-1">Users</p>
                    <p className="text-white text-2xl">{selectedTenant.users}</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-slate-400 text-sm mb-1">Inventory Items</p>
                    <p className="text-white text-2xl">{selectedTenant.inventoryItems}</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-slate-400 text-sm mb-1">Transactions</p>
                    <p className="text-white text-2xl">{selectedTenant.transactions}</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-slate-400 text-sm mb-1">Storage Used</p>
                    <p className="text-white text-2xl">{selectedTenant.storage}</p>
                  </div>
                </div>
              </div>

              {/* Billing */}
              <div>
                <h3 className="text-white mb-4">Billing Information</h3>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Current Plan</p>
                      <p className="text-white text-xl">{selectedTenant.plan}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-sm mb-1">Monthly Revenue</p>
                      <p className="text-green-400 text-xl">
                        {selectedTenant.mrr > 0 ? `GH₵ ${selectedTenant.mrr.toFixed(2)}` : 'Trial'}
                      </p>
                    </div>
                  </div>
                  {selectedTenant.mrr > 0 && (
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Next billing date: Jan 15, 2025</p>
                      <p className="text-green-400 text-sm">✓ Payment method active</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Tenant Modal */}
      <AddTenantModal
        isOpen={showNewTenantModal}
        onClose={() => setShowNewTenantModal(false)}
        onSubmit={(tenant) => {
          // Add tenant to list (in production, would call API)
          console.log('New tenant created:', tenant);
          setShowNewTenantModal(false);
        }}
      />

      {/* Add Drug Modal */}
      <AddDrugModal
        isOpen={showNewDrugModal}
        onClose={() => setShowNewDrugModal(false)}
        onSubmit={(drug) => {
          // Add drug to catalog (in production, would call API)
          console.log('New drug added:', drug);
          setShowNewDrugModal(false);
        }}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title={`Confirm ${confirmAction.charAt(0).toUpperCase() + confirmAction.slice(1)}`}
        message={`Are you sure you want to ${confirmAction} this pharmacy? This action will take effect immediately.`}
        confirmText={confirmAction.charAt(0).toUpperCase() + confirmAction.slice(1)}
        type={confirmAction === 'pause' || confirmAction === 'archive' ? 'danger' : 'warning'}
        onConfirm={() => {
          // Perform the action (in production, would call API)
          console.log(`Action: ${confirmAction} on tenant ${confirmTenantId}`);
          setShowConfirmDialog(false);
        }}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </div>
  );
}