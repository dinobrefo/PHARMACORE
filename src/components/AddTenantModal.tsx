import { useState } from 'react';
import { X, Building2, Mail, User, MapPin, CreditCard, FileText, AlertCircle } from 'lucide-react';

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tenantData: any) => void;
}

export function AddTenantModal({ isOpen, onClose, onSubmit }: AddTenantModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    ownerEmail: '',
    region: 'Accra',
    plan: 'Trial',
    licenseNumber: '',
    phone: '',
  });

  const [errors, setErrors] = useState<any>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: any = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Pharmacy name is required';
    }

    // Owner name validation
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.ownerEmail.trim()) {
      newErrors.ownerEmail = 'Email is required';
    } else if (!emailRegex.test(formData.ownerEmail)) {
      newErrors.ownerEmail = 'Invalid email format';
    }

    // License validation
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }

    // Phone validation (optional but validate format if provided)
    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Generate tenant ID
    const tenantId = `pharma-${Date.now().toString().slice(-6)}`;

    const newTenant = {
      id: tenantId,
      name: formData.name,
      ownerEmail: formData.ownerEmail,
      ownerName: formData.ownerName,
      status: formData.plan === 'Trial' ? 'trial' : 'active',
      plan: formData.plan,
      mrr: formData.plan === 'Trial' ? 0 : 
           formData.plan === 'Basic' ? 79.99 :
           formData.plan === 'Professional' ? 149.99 : 299.99,
      users: 1,
      inventoryItems: 0,
      transactions: 0,
      signupDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().slice(0, 16).replace('T', ' '),
      storage: '0 MB',
      region: formData.region,
      licenseNumber: formData.licenseNumber,
      phone: formData.phone,
    };

    onSubmit(newTenant);
    
    // Reset form
    setFormData({
      name: '',
      ownerName: '',
      ownerEmail: '',
      region: 'Accra',
      plan: 'Trial',
      licenseNumber: '',
      phone: '',
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      ownerName: '',
      ownerEmail: '',
      region: 'Accra',
      plan: 'Trial',
      licenseNumber: '',
      phone: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-white mb-1 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-400" />
              </div>
              Create New Pharmacy
            </h2>
            <p className="text-slate-400">Provision a new tenant organization</p>
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
          {/* Pharmacy Information */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-400" />
              Pharmacy Information
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-slate-300 mb-2">
                  Pharmacy Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., HealthPlus Pharmacy"
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="region" className="block text-slate-300 mb-2">
                    Region *
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Accra">Accra</option>
                    <option value="Kumasi">Kumasi</option>
                    <option value="Takoradi">Takoradi</option>
                    <option value="Tamale">Tamale</option>
                    <option value="Cape Coast">Cape Coast</option>
                    <option value="Tema">Tema</option>
                    <option value="Sunyani">Sunyani</option>
                    <option value="Koforidua">Koforidua</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="licenseNumber" className="block text-slate-300 mb-2">
                    License Number *
                  </label>
                  <input
                    id="licenseNumber"
                    name="licenseNumber"
                    type="text"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="PH-XX-2024-XXXX"
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.licenseNumber ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.licenseNumber && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.licenseNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              Owner Information
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="ownerName" className="block text-slate-300 mb-2">
                  Owner Full Name *
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Dr. James Osei"
                  className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.ownerName ? 'border-red-500' : 'border-slate-700'
                  }`}
                />
                {errors.ownerName && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.ownerName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ownerEmail" className="block text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="ownerEmail"
                    name="ownerEmail"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    placeholder="admin@pharmacy.com"
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.ownerEmail ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.ownerEmail && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.ownerEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-slate-300 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+233 XX XXX XXXX"
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Plan */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-400" />
              Subscription Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'Trial', name: 'Trial', price: 'Free', duration: '14 days', color: 'blue' },
                { id: 'Basic', name: 'Basic', price: 'GH₵ 79.99', duration: '/month', color: 'gray' },
                { id: 'Professional', name: 'Professional', price: 'GH₵ 149.99', duration: '/month', color: 'purple' },
                { id: 'Enterprise', name: 'Enterprise', price: 'GH₵ 299.99', duration: '/month', color: 'amber' },
              ].map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, plan: plan.id }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.plan === plan.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                  }`}
                >
                  <p className="text-white font-medium mb-1">{plan.name}</p>
                  <p className="text-slate-300 text-sm">{plan.price}</p>
                  <p className="text-slate-500 text-xs">{plan.duration}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium mb-1">Automated Provisioning</p>
                <p className="text-slate-300 text-sm">
                  A welcome email will be sent to the owner with setup instructions and a secure link to set their password. 
                  The tenant database will be provisioned automatically with default settings.
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
              <Building2 className="w-4 h-4" />
              Create Pharmacy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
