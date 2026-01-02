import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface NewSaleModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AVAILABLE_MEDS = [
  { name: 'Paracetamol 500mg', price: 2.50, stock: 850 },
  { name: 'Ibuprofen 400mg', price: 3.20, stock: 420 },
  { name: 'Amoxicillin 500mg', price: 8.75, stock: 45 },
  { name: 'Omeprazole 20mg', price: 6.90, stock: 51 },
  { name: 'Metformin 850mg', price: 15.50, stock: 28 },
  { name: 'Lisinopril 10mg', price: 12.30, stock: 32 },
  { name: 'Atorvastatin 20mg', price: 18.40, stock: 38 },
  { name: 'Levothyroxine 100mcg', price: 9.60, stock: 165 },
];

export function NewSaleModal({ onClose, onSubmit }: NewSaleModalProps) {
  const [patient, setPatient] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [items, setItems] = useState<any[]>([]);

  const addItem = () => {
    setItems([...items, { medication: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === 'medication') {
      const med = AVAILABLE_MEDS.find(m => m.name === value);
      if (med) {
        newItems[index].price = med.price;
      }
    }

    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedItems = items.map(item => ({
      name: item.medication,
      quantity: parseInt(item.quantity),
      price: item.price,
    }));
    onSubmit({
      patient: patient || 'Walk-in Customer',
      paymentMethod,
      items: formattedItems,
    });
  };

  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">New Sale / Prescription</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="payment" className="block text-gray-700 mb-2">
              Payment Method *
            </label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Cash">Cash</option>
              <option value="Mobile Money">Mobile Money</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-gray-700">Items *</label>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {items.length === 0 && (
                <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                  No items added. Click "Add Item" to begin.
                </div>
              )}

              {items.map((item, index) => (
                <div key={index} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <select
                      value={item.medication}
                      onChange={(e) => updateItem(index, 'medication', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select medication</option>
                      {AVAILABLE_MEDS.map((med) => (
                        <option key={med.name} value={med.name}>
                          {med.name} - GH₵{med.price} (Stock: {med.stock})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Qty"
                      required
                    />
                  </div>
                  <div className="w-28 flex items-center justify-center">
                    <p className="text-gray-900">GH₵{(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-700">Total Amount:</p>
              <p className="text-gray-900">GH₵{total.toFixed(2)}</p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={items.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Complete Sale
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}