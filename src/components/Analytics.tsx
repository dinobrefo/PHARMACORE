import { TrendingUp, DollarSign, Package, ShoppingCart } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  user: any;
}

const SALES_DATA = [
  { month: 'Jun', sales: 12400, profit: 4200 },
  { month: 'Jul', sales: 15600, profit: 5300 },
  { month: 'Aug', sales: 13800, profit: 4600 },
  { month: 'Sep', sales: 18200, profit: 6100 },
  { month: 'Oct', sales: 21500, profit: 7200 },
  { month: 'Nov', sales: 24800, profit: 8400 },
  { month: 'Dec', sales: 28500, profit: 9600 },
];

const CATEGORY_DATA = [
  { name: 'Cardiovascular', value: 28, color: '#3b82f6' },
  { name: 'Antibiotics', value: 22, color: '#10b981' },
  { name: 'Diabetes', value: 18, color: '#f59e0b' },
  { name: 'Analgesics', value: 15, color: '#8b5cf6' },
  { name: 'Gastrointestinal', value: 10, color: '#ef4444' },
  { name: 'Other', value: 7, color: '#6b7280' },
];

const PAYMENT_METHOD_DATA = [
  { name: 'Cash', value: 15840, color: '#10b981' },
  { name: 'Mobile Money', value: 12660, color: '#3b82f6' },
];

const TOP_PRODUCTS = [
  { name: 'Metformin 850mg', sales: 1245, revenue: 19297.50 },
  { name: 'Atorvastatin 20mg', sales: 980, revenue: 18032.00 },
  { name: 'Lisinopril 10mg', sales: 856, revenue: 10528.80 },
  { name: 'Omeprazole 20mg', sales: 742, revenue: 5119.80 },
  { name: 'Amoxicillin 500mg', sales: 689, revenue: 6028.75 },
];

const DAILY_SALES = [
  { day: 'Mon', transactions: 45, amount: 3200 },
  { day: 'Tue', transactions: 52, amount: 3850 },
  { day: 'Wed', transactions: 48, amount: 3450 },
  { day: 'Thu', transactions: 58, amount: 4200 },
  { day: 'Fri', transactions: 64, amount: 4800 },
  { day: 'Sat', transactions: 38, amount: 2900 },
  { day: 'Sun', transactions: 25, amount: 1850 },
];

export function Analytics({ user }: AnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600">Insights and performance metrics for your pharmacy</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +14.2%
            </span>
          </div>
          <p className="text-gray-600 mb-1">Total Revenue</p>
          <p className="text-gray-900">GH₵134,523</p>
          <p className="text-gray-500 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +8.5%
            </span>
          </div>
          <p className="text-gray-600 mb-1">Total Transactions</p>
          <p className="text-gray-900">1,847</p>
          <p className="text-gray-500 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +5.3%
            </span>
          </div>
          <p className="text-gray-600 mb-1">Avg. Transaction</p>
          <p className="text-gray-900">GH₵72.85</p>
          <p className="text-gray-500 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12.8%
            </span>
          </div>
          <p className="text-gray-600 mb-1">Profit Margin</p>
          <p className="text-gray-900">33.7%</p>
          <p className="text-gray-500 mt-1">This month</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-6">Sales Trend (6 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={SALES_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Sales (GH₵)"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Profit (GH₵)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-6">Sales by Payment Method</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={PAYMENT_METHOD_DATA}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: GH₵${value.toLocaleString()}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {PAYMENT_METHOD_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => `GH₵${value.toLocaleString()}`}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-gray-600 mb-1">Cash</p>
              <p className="text-gray-900">GH₵ {PAYMENT_METHOD_DATA[0].value.toLocaleString()}</p>
              <p className="text-gray-500">{((PAYMENT_METHOD_DATA[0].value / (PAYMENT_METHOD_DATA[0].value + PAYMENT_METHOD_DATA[1].value)) * 100).toFixed(1)}%</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-gray-600 mb-1">Mobile Money</p>
              <p className="text-gray-900">GH₵ {PAYMENT_METHOD_DATA[1].value.toLocaleString()}</p>
              <p className="text-gray-500">{((PAYMENT_METHOD_DATA[1].value / (PAYMENT_METHOD_DATA[0].value + PAYMENT_METHOD_DATA[1].value)) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-6">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={CATEGORY_DATA}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {CATEGORY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Sales */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-6">Daily Sales (This Week)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={DAILY_SALES}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              />
              <Legend />
              <Bar dataKey="amount" fill="#3b82f6" name="Amount (GH₵)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-6">Top Selling Products</h2>
          <div className="space-y-4">
            {TOP_PRODUCTS.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full">
                      {index + 1}
                    </span>
                    <p className="text-gray-900">{product.name}</p>
                  </div>
                  <div className="ml-9">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(product.sales / TOP_PRODUCTS[0].sales) * 100}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <p className="text-gray-900 ml-4">GH₵{product.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">Peak Hours</p>
          <p className="text-gray-900 mb-1">2:00 PM - 5:00 PM</p>
          <p className="text-gray-500">Busiest time of day</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">Customer Retention</p>
          <p className="text-gray-900 mb-1">84.5%</p>
          <p className="text-gray-500">Repeat customers</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">Stock Turnover</p>
          <p className="text-gray-900 mb-1">6.2 times/month</p>
          <p className="text-gray-500">Inventory rotation</p>
        </div>
      </div>
    </div>
  );
}