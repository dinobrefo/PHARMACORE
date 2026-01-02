import { Clock, DollarSign, CreditCard, Smartphone, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

interface EndShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: any;
  shiftData: {
    startTime: string;
    totalSales: number;
    cashSales: number;
    mobileMoneySales: number;
    transactionCount: number;
    itemsSold: number;
  };
}

export function EndShiftModal({ isOpen, onClose, onConfirm, user, shiftData }: EndShiftModalProps) {
  if (!isOpen) return null;

  const calculateDuration = () => {
    const start = new Date(shiftData.startTime);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8" />
            <h2 className="text-white">End Shift Summary</h2>
          </div>
          <p className="text-blue-100">
            {getGreeting()}, {user.name.split(' ')[0]}! Here's your shift performance.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Shift Duration */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Shift Duration</p>
                <p className="text-3xl text-gray-900">{calculateDuration()}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 mb-1">Started</p>
                <p className="text-gray-900 font-medium">
                  {new Date(shiftData.startTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Sales Overview */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-4">Sales Overview</h3>
            
            {/* Total Sales Card */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 mb-4 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-green-700 text-sm">Total Sales</p>
                  <p className="text-3xl text-green-900">GH₵ {shiftData.totalSales.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-green-200">
                <div>
                  <p className="text-green-700 text-sm">Transactions</p>
                  <p className="text-xl text-green-900">{shiftData.transactionCount}</p>
                </div>
                <div>
                  <p className="text-green-700 text-sm">Items Sold</p>
                  <p className="text-xl text-green-900">{shiftData.itemsSold}</p>
                </div>
              </div>
            </div>

            {/* Payment Methods Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <p className="text-blue-700 text-sm">Cash</p>
                </div>
                <p className="text-2xl text-blue-900">GH₵ {shiftData.cashSales.toFixed(2)}</p>
                <p className="text-blue-600 text-sm mt-1">
                  {((shiftData.cashSales / shiftData.totalSales) * 100).toFixed(1)}% of total
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  <p className="text-purple-700 text-sm">Mobile Money</p>
                </div>
                <p className="text-2xl text-purple-900">GH₵ {shiftData.mobileMoneySales.toFixed(2)}</p>
                <p className="text-purple-600 text-sm mt-1">
                  {((shiftData.mobileMoneySales / shiftData.totalSales) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          </div>

          {/* Performance Indicators */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Avg Transaction</p>
                <p className="text-xl text-gray-900">
                  GH₵ {(shiftData.totalSales / shiftData.transactionCount).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Sales per Hour</p>
                <p className="text-xl text-gray-900">
                  GH₵ {(shiftData.totalSales / (parseFloat(calculateDuration().split('h')[0]) || 1)).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-900 font-medium mb-1">Before ending shift</p>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Ensure all transactions are completed</li>
                  <li>• Verify cash drawer matches cash sales</li>
                  <li>• Log any discrepancies or issues</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-900 font-medium mb-1">Great work today!</p>
                <p className="text-green-800 text-sm">
                  Your shift data will be saved and included in today's reports.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            End Shift & Logout
          </button>
        </div>
      </div>
    </div>
  );
}
