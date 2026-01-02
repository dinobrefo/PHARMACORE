import { useState } from 'react';
import { X, Pill, AlertCircle } from 'lucide-react';

interface AddDrugModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (drugData: any) => void;
}

export function AddDrugModal({ isOpen, onClose, onSubmit }: AddDrugModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    category: 'Analgesics',
    manufacturer: '',
    standardSku: '',
    description: '',
  });

  const [errors, setErrors] = useState<any>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Drug name is required';
    }

    if (!formData.genericName.trim()) {
      newErrors.genericName = 'Generic name is required';
    }

    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = 'Manufacturer is required';
    }

    if (!formData.standardSku.trim()) {
      newErrors.standardSku = 'Standard SKU is required';
    } else if (!/^[A-Z]{3}-\d{3,4}$/.test(formData.standardSku)) {
      newErrors.standardSku = 'SKU format should be ABC-123 (3 letters, dash, 3-4 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newDrug = {
      id: `drug-${Date.now().toString().slice(-6)}`,
      name: formData.name,
      genericName: formData.genericName,
      category: formData.category,
      manufacturer: formData.manufacturer,
      standardSku: formData.standardSku.toUpperCase(),
      description: formData.description,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    };

    onSubmit(newDrug);
    
    // Reset form
    setFormData({
      name: '',
      genericName: '',
      category: 'Analgesics',
      manufacturer: '',
      standardSku: '',
      description: '',
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      genericName: '',
      category: 'Analgesics',
      manufacturer: '',
      standardSku: '',
      description: '',
    });
    setErrors({});
    onClose();
  };

  const categories = [
    'Analgesics',
    'Antibiotics',
    'Antifungals',
    'Antivirals',
    'Antihistamines',
    'Antihypertensives',
    'Diabetes',
    'Cardiovascular',
    'Respiratory',
    'Gastrointestinal',
    'Vitamins & Supplements',
    'Other',
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-white mb-1 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Pill className="w-5 h-5 text-purple-400" />
              </div>
              Add Drug to Global Catalog
            </h2>
            <p className="text-slate-400">Add a new drug to the master database</p>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-white mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-slate-300 mb-2">
                  Drug Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Paracetamol 500mg"
                  className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-slate-700'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
                <p className="text-slate-500 text-sm mt-1">
                  Include dosage in the name (e.g., 500mg, 20mg)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="genericName" className="block text-slate-300 mb-2">
                    Generic Name *
                  </label>
                  <input
                    id="genericName"
                    name="genericName"
                    type="text"
                    value={formData.genericName}
                    onChange={handleChange}
                    placeholder="e.g., Acetaminophen"
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.genericName ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.genericName && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.genericName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="category" className="block text-slate-300 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="manufacturer" className="block text-slate-300 mb-2">
                    Manufacturer *
                  </label>
                  <input
                    id="manufacturer"
                    name="manufacturer"
                    type="text"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    placeholder="e.g., GSK, Pfizer, or 'Generic'"
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.manufacturer ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.manufacturer && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.manufacturer}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="standardSku" className="block text-slate-300 mb-2">
                    Standard SKU *
                  </label>
                  <input
                    id="standardSku"
                    name="standardSku"
                    type="text"
                    value={formData.standardSku}
                    onChange={handleChange}
                    placeholder="PAR-500"
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.standardSku ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.standardSku && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.standardSku}
                    </p>
                  )}
                  <p className="text-slate-500 text-sm mt-1">
                    Format: ABC-123 (3 letters, dash, 3-4 digits)
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-slate-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Additional information about this drug..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium mb-1">Global Catalog</p>
                <p className="text-slate-300 text-sm">
                  This drug will be immediately available to all pharmacies in their "Add Medication" dropdown. 
                  Pharmacies will add their own pricing, stock levels, and batch information.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Pill className="w-4 h-4" />
              Add to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
