import { useState } from 'react';
import { Plus, Search, Calendar, FileText, User } from 'lucide-react';
import { NewSaleModal } from './NewSaleModal';

interface SalesProps {
  user: any;
}

const MOCK_SALES = [
  {
    id: 'RX-2024-1234',
    date: '2024-12-29',
    time: '14:32',
    patient: 'Walk-in Customer',
    pharmacist: 'Dr. Michael Chen',
    items: [
      { name: 'Paracetamol 500mg', quantity: 20, price: 2.50 },
      { name: 'Ibuprofen 400mg', quantity: 12, price: 3.20 },
    ],
    total: 88.40,
    status: 'Completed',
    paymentMethod: 'Cash',
  },
  {
    id: 'RX-2024-1233',
    date: '2024-12-29',
    time: '13:15',
    patient: 'Walk-in Customer',
    pharmacist: 'Dr. Michael Chen',
    items: [
      { name: 'Amoxicillin 500mg', quantity: 21, price: 8.75 },
      { name: 'Omeprazole 20mg', quantity: 14, price: 6.90 },
    ],
    total: 280.35,
    status: 'Completed',
    paymentMethod: 'Mobile Money',
  },
  {
    id: 'RX-2024-1232',
    date: '2024-12-29',
    time: '11:45',
    patient: 'Walk-in Customer',
    pharmacist: 'Sarah Johnson',
    items: [
      { name: 'Metformin 850mg', quantity: 30, price: 15.50 },
      { name: 'Atorvastatin 20mg', quantity: 30, price: 18.40 },
    ],
    total: 1017.00,
    status: 'Completed',
    paymentMethod: 'Mobile Money',
  },
  {
    id: 'RX-2024-1231',
    date: '2024-12-28',
    time: '16:20',
    patient: 'Sarah Williams',
    pharmacist: 'Dr. Michael Chen',
    items: [
      { name: 'Lisinopril 10mg', quantity: 28, price: 12.30 },
    ],
    total: 344.40,
    status: 'Completed',
    paymentMethod: 'Cash',
  },
  {
    id: 'RX-2024-1230',
    date: '2024-12-28',
    time: '15:10',
    patient: 'Walk-in Customer',
    pharmacist: 'Sarah Johnson',
    items: [
      { name: 'Levothyroxine 100mcg', quantity: 30, price: 9.60 },
      { name: 'Paracetamol 500mg', quantity: 24, price: 2.50 },
    ],
    total: 348.00,
    status: 'Completed',
    paymentMethod: 'Cash',
  },
];

export function Sales({ user }: SalesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [sales, setSales] = useState(MOCK_SALES);

  const filteredSales = sales.filter((sale) =>
    sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.patient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayTotal = sales
    .filter(sale => sale.date === '2024-12-29')
    .reduce((sum, sale) => sum + sale.total, 0);

  const todayCount = sales.filter(sale => sale.date === '2024-12-29').length;

  // Calculate today's sales by payment method
  const todaySales = sales.filter(sale => sale.date === '2024-12-29');
  const todayCash = todaySales
    .filter(sale => sale.paymentMethod === 'Cash')
    .reduce((sum, sale) => sum + sale.total, 0);
  const todayMobileMoney = todaySales
    .filter(sale => sale.paymentMethod === 'Mobile Money')
    .reduce((sum, sale) => sum + sale.total, 0);

  const handleNewSale = (saleData: any) => {
    const newSale = {
      id: `RX-2024-${1235 + sales.length}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      pharmacist: user.name,
      ...saleData,
      total: saleData.items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0),
      status: 'Completed',
    };
    setSales([newSale, ...sales]);
    setShowNewSaleModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Sales & Dispensing</h1>
          <p className="text-gray-600">Track prescriptions and sales transactions</p>
        </div>
        <button
          onClick={() => setShowNewSaleModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Sale</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">Today's Total Sales</p>
          <p className="text-gray-900">GH₵{todayTotal.toFixed(2)}</p>
          <p className="text-gray-500 mt-1">{todayCount} transactions</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">Cash Payments</p>
          <p className="text-gray-900">GH₵{todayCash.toFixed(2)}</p>
          <p className="text-gray-500 mt-1">Today</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">Mobile Money</p>
          <p className="text-gray-900">GH₵{todayMobileMoney.toFixed(2)}</p>
          <p className="text-gray-500 mt-1">Today</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-2">This Week</p>
          <p className="text-gray-900">GH₵12,456.80</p>
          <p className="text-gray-500 mt-1">87 transactions</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by prescription ID..."
            className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sales List */}
      <div className="space-y-4">
        {filteredSales.map((sale) => (
          <div
            key={sale.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
            onClick={() => setSelectedSale(selectedSale?.id === sale.id ? null : sale)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-gray-900 mb-1">{sale.id}</p>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {sale.date} at {sale.time}
                      </span>
                      {sale.patient !== 'Walk-in Customer' && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {sale.patient}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">
                    {sale.status}
                  </span>
                </div>

                {selectedSale?.id === sale.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 mb-3">Items:</p>
                    <div className="space-y-2">
                      {sale.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-gray-900">{item.name}</p>
                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="text-gray-900">GH₵{(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="text-gray-600">
                        <p>Pharmacist: {sale.pharmacist}</p>
                        <p>Payment: {sale.paymentMethod}</p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FileText className="w-4 h-4" />
                        <span>Print Receipt</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right">
                <p className="text-gray-900">GH₵{sale.total.toFixed(2)}</p>
                <p className="text-gray-500">{sale.items.length} items</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewSaleModal && (
        <NewSaleModal
          onClose={() => setShowNewSaleModal(false)}
          onSubmit={handleNewSale}
        />
      )}
    </div>
  );
}