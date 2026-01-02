import { Package, TrendingDown, DollarSign, AlertTriangle, ArrowUp, ArrowDown, Clock, Activity, Wallet, CreditCard } from 'lucide-react';

interface DashboardProps {
  user: any;
}

const STATS = [
  {
    label: 'Total Inventory Value',
    value: 'GH₵284,950',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'blue',
  },
  {
    label: 'Low Stock Items',
    value: '23',
    change: '+3',
    trend: 'up',
    icon: AlertTriangle,
    color: 'orange',
  },
  {
    label: 'Items Out of Stock',
    value: '8',
    change: '-2',
    trend: 'down',
    icon: TrendingDown,
    color: 'red',
  },
  {
    label: 'Total Products',
    value: '1,247',
    change: '+18',
    trend: 'up',
    icon: Package,
    color: 'green',
  },
];

const LOW_STOCK_ITEMS = [
  { name: 'Amoxicillin 500mg', stock: 45, minStock: 100, category: 'Antibiotics' },
  { name: 'Lisinopril 10mg', stock: 32, minStock: 80, category: 'Cardiovascular' },
  { name: 'Metformin 850mg', stock: 28, minStock: 120, category: 'Diabetes' },
  { name: 'Omeprazole 20mg', stock: 51, minStock: 100, category: 'Gastrointestinal' },
  { name: 'Atorvastatin 20mg', stock: 38, minStock: 90, category: 'Cholesterol' },
];

const RECENT_ACTIVITIES = [
  { action: 'Stock Added', item: 'Paracetamol 500mg', quantity: '+500 units', time: '5 min ago', user: 'Sarah J.' },
  { action: 'Sale', item: 'Ibuprofen 400mg', quantity: '-24 units', time: '12 min ago', user: 'Dr. Chen' },
  { action: 'Stock Alert', item: 'Amoxicillin 500mg', quantity: 'Low stock', time: '25 min ago', user: 'System' },
  { action: 'Stock Added', item: 'Aspirin 75mg', quantity: '+300 units', time: '1 hour ago', user: 'Sarah J.' },
  { action: 'Sale', item: 'Metformin 850mg', quantity: '-18 units', time: '2 hours ago', user: 'Dr. Chen' },
];

const EXPIRING_SOON = [
  { name: 'Cetirizine 10mg', batch: 'BT2024-089', expiryDate: '2025-02-15', quantity: 120 },
  { name: 'Azithromycin 250mg', batch: 'BT2024-112', expiryDate: '2025-03-01', quantity: 80 },
  { name: 'Prednisolone 5mg', batch: 'BT2023-456', expiryDate: '2025-03-10', quantity: 45 },
];

export function Dashboard({ user }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-gray-900">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your pharmacy today.</p>
      </div>

      {/* Live Sales Dashboard (Admin Only) */}
      {user.role === 'admin' && (
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl border border-blue-500 shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-white">Today's Live Sales</h2>
                  <p className="text-blue-100">Real-time revenue tracking</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                </span>
                <span className="text-white">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Sales */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-100" />
                  <p className="text-blue-100">Total Sales</p>
                </div>
                <p className="text-white text-3xl mb-1">GH₵12,450</p>
                <div className="flex items-center gap-1 text-green-300">
                  <ArrowUp className="w-4 h-4" />
                  <span>+18.5% from yesterday</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-blue-100">45 transactions today</p>
                </div>
              </div>

              {/* Cash Sales */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-5 h-5 text-blue-100" />
                  <p className="text-blue-100">Cash</p>
                </div>
                <p className="text-white text-3xl mb-1">GH₵7,280</p>
                <div className="flex items-center gap-1 text-blue-200">
                  <span>58.5% of total</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-blue-100">28 cash transactions</p>
                </div>
              </div>

              {/* Mobile Money Sales */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-blue-100" />
                  <p className="text-blue-100">Mobile Money</p>
                </div>
                <p className="text-white text-3xl mb-1">GH₵5,170</p>
                <div className="flex items-center gap-1 text-blue-200">
                  <span>41.5% of total</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-blue-100">17 MoMo transactions</p>
                </div>
              </div>
            </div>

            {/* Last Sale */}
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-white">Last sale: GH₵85.00 via Cash</p>
                    <p className="text-blue-100">2 items • 3 minutes ago • Dr. Chen</p>
                  </div>
                </div>
                <div className="text-blue-100">
                  Updated just now
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
          
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-50 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${
                  stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  <TrendIcon className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-1">{stat.label}</p>
              <p className="text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Items */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">Low Stock Alert</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {LOW_STOCK_ITEMS.map((item, idx) => {
              const stockPercentage = (item.stock / item.minStock) * 100;
              
              return (
                <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-900">{item.name}</p>
                      <p className="text-gray-500">{item.category}</p>
                    </div>
                    <span className="text-orange-600">{item.stock} units</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${stockPercentage < 30 ? 'bg-red-500' : 'bg-orange-500'}`}
                        style={{ width: `${stockPercentage}%` }}
                      />
                    </div>
                    <span className="text-gray-500">{item.minStock}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-Time Sales Monitor (Admin Only) or Recent Activity */}
        {user.role === 'admin' ? (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h2 className="text-gray-900">Real-Time Sales Monitor</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-600">Live</span>
              </div>
            </div>
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {RECENT_ACTIVITIES.map((activity, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      activity.action === 'Sale' ? 'bg-green-50' : 'bg-blue-50'
                    }`}>
                      <Clock className={`w-4 h-4 ${
                        activity.action === 'Sale' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-gray-900">{activity.action}</p>
                        <span className="text-gray-400">{activity.time}</span>
                      </div>
                      <p className="text-gray-600">{activity.item}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          activity.action === 'Sale' 
                            ? 'bg-green-50 text-green-700' 
                            : activity.action === 'Stock Alert'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}>
                          {activity.quantity}
                        </span>
                        <span className="text-gray-400">by {activity.user}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-center text-gray-500">
                Showing last 5 activities • Updates automatically
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {RECENT_ACTIVITIES.map((activity, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-gray-600">{activity.item} • {activity.quantity}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400">{activity.time}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{activity.user}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Expiring Soon */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Expiring Soon (Next 90 Days)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Medication</th>
                <th className="px-6 py-3 text-left text-gray-700">Batch Number</th>
                <th className="px-6 py-3 text-left text-gray-700">Expiry Date</th>
                <th className="px-6 py-3 text-left text-gray-700">Quantity</th>
                <th className="px-6 py-3 text-left text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {EXPIRING_SOON.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">{item.batch}</td>
                  <td className="px-6 py-4 text-red-600">{item.expiryDate}</td>
                  <td className="px-6 py-4 text-gray-600">{item.quantity} units</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700">
                      Mark for Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}