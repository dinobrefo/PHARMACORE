import { useState } from 'react';
import { 
  Save, 
  Mail, 
  CreditCard, 
  Shield, 
  Database, 
  Bell, 
  Globe, 
  Key,
  AlertCircle,
  CheckCircle,
  Settings as SettingsIcon,
  Zap,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  Server
} from 'lucide-react';

interface GodAdminSettingsProps {
  onSave: (settings: any) => void;
}

export function GodAdminSettings({ onSave }: GodAdminSettingsProps) {
  const [activeTab, setActiveTab] = useState('platform');
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Platform Settings
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'Pharmacore',
    supportEmail: 'support@pharmacore.com',
    companyName: 'Pharmacore Ltd.',
    timezone: 'Africa/Accra',
    currency: 'GHS',
    language: 'en',
    maintenanceMode: false,
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.sendgrid.net',
    smtpPort: '587',
    smtpUsername: 'apikey',
    smtpPassword: '••••••••••••••••',
    fromEmail: 'noreply@pharmacore.com',
    fromName: 'Pharmacore',
    enableEmailNotifications: true,
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    provider: 'stripe',
    publicKey: 'pk_test_••••••••••••••••',
    secretKey: 'sk_test_••••••••••••••••',
    webhookSecret: 'whsec_••••••••••••••••',
    currency: 'GHS',
    enableAutoRenewal: true,
    trialPeriodDays: 14,
  });

  // Feature Flags
  const [featureFlags, setFeatureFlags] = useState({
    advancedAnalytics: { enabled: true, plans: ['Professional', 'Enterprise'] },
    inventoryForecasting: { enabled: true, plans: ['Enterprise'] },
    mobileMoney: { enabled: true, plans: ['Basic', 'Professional', 'Enterprise'] },
    offlineMode: { enabled: true, plans: ['Basic', 'Professional', 'Enterprise'] },
    multiLocation: { enabled: true, plans: ['Enterprise'] },
    apiAccess: { enabled: false, plans: ['Enterprise'] },
    whiteLabel: { enabled: false, plans: ['Enterprise'] },
    ssoIntegration: { enabled: false, plans: ['Enterprise'] },
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    require2FA: false,
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    enableIpWhitelist: false,
    ipWhitelist: '',
  });

  // Backup Settings
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    retentionDays: 30,
    enableCloudBackup: true,
    cloudProvider: 'aws-s3',
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    newSignupAlert: true,
    paymentFailureAlert: true,
    systemErrorAlert: true,
    highApiUsageAlert: true,
    backupCompletionAlert: false,
    securityAlert: true,
    alertEmail: 'admin@pharmacore.com',
    alertSlackWebhook: '',
  });

  // API Settings
  const [apiSettings, setApiSettings] = useState({
    masterApiKey: 'pk_godadmin_••••••••••••••••••••',
    rateLimitPerMinute: 100,
    enableCors: true,
    allowedOrigins: 'https://pharmacore.com',
    apiVersion: 'v1',
    enableWebhooks: true,
  });

  const handleSave = () => {
    const allSettings = {
      platform: platformSettings,
      email: emailSettings,
      payment: paymentSettings,
      features: featureFlags,
      security: securitySettings,
      backup: backupSettings,
      notifications: notificationSettings,
      api: apiSettings,
    };

    onSave(allSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: 'platform', label: 'Platform', icon: Globe },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API', icon: Key },
  ];

  const renderPlatformSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white mb-4">General Platform Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">Platform Name</label>
              <input
                type="text"
                value={platformSettings.platformName}
                onChange={(e) => setPlatformSettings({ ...platformSettings, platformName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">Support Email</label>
              <input
                type="email"
                value={platformSettings.supportEmail}
                onChange={(e) => setPlatformSettings({ ...platformSettings, supportEmail: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">Company Name</label>
              <input
                type="text"
                value={platformSettings.companyName}
                onChange={(e) => setPlatformSettings({ ...platformSettings, companyName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">Timezone</label>
              <select
                value={platformSettings.timezone}
                onChange={(e) => setPlatformSettings({ ...platformSettings, timezone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Africa/Accra">Africa/Accra (GMT)</option>
                <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">Default Currency</label>
              <select
                value={platformSettings.currency}
                onChange={(e) => setPlatformSettings({ ...platformSettings, currency: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="GHS">GHS - Ghana Cedi (GH₵)</option>
                <option value="NGN">NGN - Nigerian Naira (₦)</option>
                <option value="KES">KES - Kenyan Shilling (KSh)</option>
                <option value="USD">USD - US Dollar ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 mb-2">Default Language</label>
              <select
                value={platformSettings.language}
                onChange={(e) => setPlatformSettings({ ...platformSettings, language: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="sw">Kiswahili</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-amber-400 font-medium">Maintenance Mode</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformSettings.maintenanceMode}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, maintenanceMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
            <p className="text-slate-300 text-sm">
              When enabled, all pharmacies will see a maintenance page. Only GodAdmin can access the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white mb-4">SMTP Configuration</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">SMTP Host</label>
              <input
                type="text"
                value={emailSettings.smtpHost}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">SMTP Port</label>
              <input
                type="text"
                value={emailSettings.smtpPort}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">SMTP Username</label>
              <input
                type="text"
                value={emailSettings.smtpUsername}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">SMTP Password</label>
              <input
                type="password"
                value={emailSettings.smtpPassword}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-white mb-4">Email Sender Configuration</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">From Email</label>
              <input
                type="email"
                value={emailSettings.fromEmail}
                onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">From Name</label>
              <input
                type="text"
                value={emailSettings.fromName}
                onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">Enable Email Notifications</p>
              <p className="text-slate-400 text-sm">Send transactional emails to users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailSettings.enableEmailNotifications}
                onChange={(e) => setEmailSettings({ ...emailSettings, enableEmailNotifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            <Mail className="w-4 h-4" />
            Send Test Email
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white mb-4">Payment Gateway Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2">Payment Provider</label>
            <select
              value={paymentSettings.provider}
              onChange={(e) => setPaymentSettings({ ...paymentSettings, provider: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="stripe">Stripe</option>
              <option value="paystack">Paystack (Africa)</option>
              <option value="flutterwave">Flutterwave (Africa)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Public Key</label>
            <input
              type="text"
              value={paymentSettings.publicKey}
              onChange={(e) => setPaymentSettings({ ...paymentSettings, publicKey: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Secret Key</label>
            <input
              type="password"
              value={paymentSettings.secretKey}
              onChange={(e) => setPaymentSettings({ ...paymentSettings, secretKey: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Webhook Secret</label>
            <input
              type="password"
              value={paymentSettings.webhookSecret}
              onChange={(e) => setPaymentSettings({ ...paymentSettings, webhookSecret: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">Currency</label>
              <select
                value={paymentSettings.currency}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="GHS">GHS - Ghana Cedi</option>
                <option value="NGN">NGN - Nigerian Naira</option>
                <option value="KES">KES - Kenyan Shilling</option>
                <option value="USD">USD - US Dollar</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 mb-2">Trial Period (Days)</label>
              <input
                type="number"
                value={paymentSettings.trialPeriodDays}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, trialPeriodDays: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">Enable Auto-Renewal</p>
              <p className="text-slate-400 text-sm">Automatically charge subscriptions on renewal date</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={paymentSettings.enableAutoRenewal}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, enableAutoRenewal: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeatureFlags = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white mb-4">Feature Flag Management</h3>
        <p className="text-slate-400 mb-6">Control which features are available to different subscription plans</p>
        
        <div className="space-y-3">
          {Object.entries(featureFlags).map(([key, value]) => (
            <div key={key} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value.enabled}
                        onChange={(e) => setFeatureFlags({
                          ...featureFlags,
                          [key]: { ...value, enabled: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {value.plans.map((plan) => (
                      <span
                        key={plan}
                        className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      >
                        {plan}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-400 font-medium mb-1">Feature Flag Usage</p>
            <p className="text-slate-300 text-sm">
              Disabled features will be hidden from all users. Plan restrictions will only show features to the specified subscription tiers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white mb-4">Authentication Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">Require Two-Factor Authentication</p>
              <p className="text-slate-400 text-sm">Force all users to enable 2FA</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.require2FA}
                onChange={(e) => setSecuritySettings({ ...securitySettings, require2FA: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">Min Password Length</label>
              <input
                type="number"
                value={securitySettings.passwordMinLength}
                onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3">
            {[
              { key: 'passwordRequireUppercase', label: 'Require Uppercase Letters' },
              { key: 'passwordRequireNumbers', label: 'Require Numbers' },
              { key: 'passwordRequireSymbols', label: 'Require Symbols' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-700 rounded-lg">
                <p className="text-white">{item.label}</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(securitySettings as any)[item.key]}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, [item.key]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-white mb-4">Login Protection</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">Max Login Attempts</label>
              <input
                type="number"
                value={securitySettings.maxLoginAttempts}
                onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">Lockout Duration (minutes)</label>
              <input
                type="number"
                value={securitySettings.lockoutDuration}
                onChange={(e) => setSecuritySettings({ ...securitySettings, lockoutDuration: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">Enable IP Whitelist</p>
              <p className="text-slate-400 text-sm">Restrict GodAdmin access to specific IPs</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.enableIpWhitelist}
                onChange={(e) => setSecuritySettings({ ...securitySettings, enableIpWhitelist: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {securitySettings.enableIpWhitelist && (
            <div>
              <label className="block text-slate-300 mb-2">Allowed IP Addresses (one per line)</label>
              <textarea
                value={securitySettings.ipWhitelist}
                onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                rows={4}
                placeholder="192.168.1.1&#10;10.0.0.0/24"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white mb-4">Automated Backup Configuration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">Enable Automatic Backups</p>
              <p className="text-slate-400 text-sm">Schedule regular database backups</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={backupSettings.autoBackup}
                onChange={(e) => setBackupSettings({ ...backupSettings, autoBackup: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {backupSettings.autoBackup && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">Backup Frequency</label>
                  <select
                    value={backupSettings.backupFrequency}
                    onChange={(e) => setBackupSettings({ ...backupSettings, backupFrequency: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Backup Time</label>
                  <input
                    type="time"
                    value={backupSettings.backupTime}
                    onChange={(e) => setBackupSettings({ ...backupSettings, backupTime: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Retention Period (Days)</label>
                <input
                  type="number"
                  value={backupSettings.retentionDays}
                  onChange={(e) => setBackupSettings({ ...backupSettings, retentionDays: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">Cloud Backup</p>
              <p className="text-slate-400 text-sm">Store backups in cloud storage</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={backupSettings.enableCloudBackup}
                onChange={(e) => setBackupSettings({ ...backupSettings, enableCloudBackup: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {backupSettings.enableCloudBackup && (
            <div>
              <label className="block text-slate-300 mb-2">Cloud Provider</label>
              <select
                value={backupSettings.cloudProvider}
                onChange={(e) => setBackupSettings({ ...backupSettings, cloudProvider: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="aws-s3">AWS S3</option>
                <option value="google-cloud">Google Cloud Storage</option>
                <option value="azure-blob">Azure Blob Storage</option>
                <option value="digitalocean">DigitalOcean Spaces</option>
              </select>
            </div>
          )}

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
            Run Manual Backup Now
          </button>
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <div className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-400 font-medium">Last Backup</p>
            <p className="text-slate-300 text-sm">Completed successfully on Dec 29, 2024 at 02:00 AM (2.3 GB)</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white mb-4">Alert Configuration</h3>
        <p className="text-slate-400 mb-6">Configure which events trigger GodAdmin notifications</p>
        
        <div className="space-y-3">
          {[
            { key: 'newSignupAlert', label: 'New Pharmacy Signup', description: 'Alert when a new tenant registers' },
            { key: 'paymentFailureAlert', label: 'Payment Failure', description: 'Alert when subscription payment fails' },
            { key: 'systemErrorAlert', label: 'System Error', description: 'Alert on critical system errors' },
            { key: 'highApiUsageAlert', label: 'High API Usage', description: 'Alert when API usage exceeds threshold' },
            { key: 'backupCompletionAlert', label: 'Backup Completion', description: 'Alert when automated backup completes' },
            { key: 'securityAlert', label: 'Security Event', description: 'Alert on suspicious activity or security incidents' },
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
              <div className="flex-1">
                <p className="text-white font-medium mb-1">{item.label}</p>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={(notificationSettings as any)[item.key]}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white mb-4">Notification Channels</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2">Alert Email Address</label>
            <input
              type="email"
              value={notificationSettings.alertEmail}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, alertEmail: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Slack Webhook URL (Optional)</label>
            <input
              type="text"
              value={notificationSettings.alertSlackWebhook}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, alertSlackWebhook: e.target.value })}
              placeholder="https://hooks.slack.com/services/..."
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2">Master API Key</label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiSettings.masterApiKey}
                onChange={(e) => setApiSettings({ ...apiSettings, masterApiKey: e.target.value })}
                className="w-full px-4 py-3 pr-12 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-700 rounded transition-colors"
              >
                {showApiKey ? (
                  <EyeOff className="w-5 h-5 text-slate-400" />
                ) : (
                  <Eye className="w-5 h-5 text-slate-400" />
                )}
              </button>
            </div>
            <p className="text-slate-500 text-sm mt-1">This key has full access to all API endpoints</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-2">Rate Limit (per minute)</label>
              <input
                type="number"
                value={apiSettings.rateLimitPerMinute}
                onChange={(e) => setApiSettings({ ...apiSettings, rateLimitPerMinute: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">API Version</label>
              <select
                value={apiSettings.apiVersion}
                onChange={(e) => setApiSettings({ ...apiSettings, apiVersion: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="v1">v1 (Current)</option>
                <option value="v2">v2 (Beta)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">Enable CORS</p>
              <p className="text-slate-400 text-sm">Allow cross-origin requests</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={apiSettings.enableCors}
                onChange={(e) => setApiSettings({ ...apiSettings, enableCors: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {apiSettings.enableCors && (
            <div>
              <label className="block text-slate-300 mb-2">Allowed Origins</label>
              <textarea
                value={apiSettings.allowedOrigins}
                onChange={(e) => setApiSettings({ ...apiSettings, allowedOrigins: e.target.value })}
                rows={3}
                placeholder="https://example.com&#10;https://app.example.com"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">Enable Webhooks</p>
              <p className="text-slate-400 text-sm">Allow tenants to configure webhook endpoints</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={apiSettings.enableWebhooks}
                onChange={(e) => setApiSettings({ ...apiSettings, enableWebhooks: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
            <Key className="w-4 h-4" />
            Regenerate API Key
          </button>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex gap-3">
          <Server className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-400 font-medium mb-1">API Documentation</p>
            <p className="text-slate-300 text-sm mb-2">
              Complete API documentation is available at: <span className="text-blue-400">https://api.pharmacore.com/docs</span>
            </p>
            <button className="text-blue-400 text-sm hover:underline">View API Docs →</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-1">System Settings</h2>
        <p className="text-slate-400">Configure global platform settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
        {activeTab === 'platform' && renderPlatformSettings()}
        {activeTab === 'email' && renderEmailSettings()}
        {activeTab === 'payment' && renderPaymentSettings()}
        {activeTab === 'features' && renderFeatureFlags()}
        {activeTab === 'security' && renderSecuritySettings()}
        {activeTab === 'backup' && renderBackupSettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'api' && renderApiSettings()}
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4">
        {saveSuccess && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span>Settings saved successfully!</span>
          </div>
        )}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-lg shadow-purple-600/30"
        >
          <Save className="w-4 h-4" />
          Save All Settings
        </button>
      </div>
    </div>
  );
}
