import { useState } from 'react';
import { Plus, Search, Filter, Download, Upload, Edit, Trash2, Package } from 'lucide-react';
import { AddMedicationModal } from './AddMedicationModal';

interface InventoryProps {
  user: any;
}

const MOCK_INVENTORY = [
  {
    id: 1,
    name: 'Paracetamol',
    strength: '500mg',
    category: 'Analgesics',
    manufacturer: 'PharmaCorp',
    stock: 850,
    minStock: 200,
    price: 2.50,
    batchNumber: 'BT2024-345',
    expiryDate: '2026-08-15',
    location: 'A-12',
  },
  {
    id: 2,
    name: 'Amoxicillin',
    strength: '500mg',
    category: 'Antibiotics',
    manufacturer: 'MediLife',
    stock: 45,
    minStock: 100,
    price: 8.75,
    batchNumber: 'BT2024-123',
    expiryDate: '2025-12-20',
    location: 'B-05',
  },
  {
    id: 3,
    name: 'Lisinopril',
    strength: '10mg',
    category: 'Cardiovascular',
    manufacturer: 'CardioMed',
    stock: 32,
    minStock: 80,
    price: 12.30,
    batchNumber: 'BT2024-789',
    expiryDate: '2026-03-10',
    location: 'C-18',
  },
  {
    id: 4,
    name: 'Metformin',
    strength: '850mg',
    category: 'Diabetes',
    manufacturer: 'DiabetaCare',
    stock: 28,
    minStock: 120,
    price: 15.50,
    batchNumber: 'BT2024-456',
    expiryDate: '2025-11-30',
    location: 'D-22',
  },
  {
    id: 5,
    name: 'Omeprazole',
    strength: '20mg',
    category: 'Gastrointestinal',
    manufacturer: 'GastroHealth',
    stock: 51,
    minStock: 100,
    price: 6.90,
    batchNumber: 'BT2024-234',
    expiryDate: '2026-05-15',
    location: 'A-08',
  },
  {
    id: 6,
    name: 'Ibuprofen',
    strength: '400mg',
    category: 'Analgesics',
    manufacturer: 'PharmaCorp',
    stock: 420,
    minStock: 150,
    price: 3.20,
    batchNumber: 'BT2024-567',
    expiryDate: '2026-07-22',
    location: 'A-15',
  },
  {
    id: 7,
    name: 'Atorvastatin',
    strength: '20mg',
    category: 'Cholesterol',
    manufacturer: 'CardioMed',
    stock: 38,
    minStock: 90,
    price: 18.40,
    batchNumber: 'BT2024-890',
    expiryDate: '2026-01-18',
    location: 'C-11',
  },
  {
    id: 8,
    name: 'Levothyroxine',
    strength: '100mcg',
    category: 'Thyroid',
    manufacturer: 'EndoPharm',
    stock: 165,
    minStock: 70,
    price: 9.60,
    batchNumber: 'BT2024-678',
    expiryDate: '2026-09-05',
    location: 'E-03',
  },
];

const CATEGORIES = ['All', 'Analgesics', 'Antibiotics', 'Cardiovascular', 'Diabetes', 'Gastrointestinal', 'Cholesterol', 'Thyroid'];

export function Inventory({ user }: InventoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [inventory, setInventory] = useState(MOCK_INVENTORY);

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.batchNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'red' };
    if (stock < minStock * 0.5) return { label: 'Critical', color: 'red' };
    if (stock < minStock) return { label: 'Low Stock', color: 'orange' };
    return { label: 'In Stock', color: 'green' };
  };

  const handleAddMedication = (newMed: any) => {
    const medication = {
      ...newMed,
      id: inventory.length + 1,
    };
    setInventory([...inventory, medication]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage your pharmacy stock and medications</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Import</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medication</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or batch number..."
                className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-gray-600">Total Items</p>
          </div>
          <p className="text-gray-900">{inventory.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-gray-600">Low Stock</p>
          </div>
          <p className="text-gray-900">
            {inventory.filter(item => item.stock < item.minStock).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600">Total Value</p>
          </div>
          <p className="text-gray-900">
            GH₵{inventory.reduce((sum, item) => sum + (item.stock * item.price), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Medication</th>
                <th className="px-6 py-3 text-left text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-gray-700">Stock</th>
                <th className="px-6 py-3 text-left text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-gray-700">Batch</th>
                <th className="px-6 py-3 text-left text-gray-700">Expiry</th>
                <th className="px-6 py-3 text-left text-gray-700">Location</th>
                <th className="px-6 py-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInventory.map((item) => {
                const status = getStockStatus(item.stock, item.minStock);
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900">{item.name}</p>
                        <p className="text-gray-500">{item.strength}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.category}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900">{item.stock} units</p>
                        <p className="text-gray-400">Min: {item.minStock}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-${status.color}-700 bg-${status.color}-50`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">GH₵ {item.price}</td>
                    <td className="px-6 py-4 text-gray-600">{item.batchNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{item.expiryDate}</td>
                    <td className="px-6 py-4 text-gray-600">{item.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddMedicationModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMedication}
        />
      )}
    </div>
  );
}