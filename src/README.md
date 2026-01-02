# Pharmacore - Multi-Tenant SaaS Pharmacy Management Platform

A comprehensive Progressive Web App (PWA) for pharmacy inventory and management with a native app feel.

## 🚀 Features

### Dashboard
- Real-time inventory statistics and KPIs
- Low stock alerts and notifications
- Recent activity feed
- Expiring medication tracking
- Visual stock level indicators

### Inventory Management
- Complete medication catalog with search and filters
- Category-based organization
- Stock level monitoring with min/max thresholds
- Batch number and expiry date tracking
- Storage location management
- Add/Edit/Delete medication records
- Import/Export functionality
- Real-time stock status indicators

### Sales & Dispensing
- Point-of-sale interface for prescription fulfillment
- Patient record management
- Multi-item transaction support
- Multiple payment methods (Cash, Card, Insurance, Digital Wallet)
- Transaction history and search
- Receipt generation
- Daily, weekly, and monthly sales summaries

### Analytics & Reports
- Revenue and profit trend analysis
- Sales by category distribution (Pie Chart)
- Daily sales patterns (Bar Chart)
- Top-selling products ranking
- Key performance indicators (KPIs)
- Customer retention metrics
- Stock turnover analysis
- Peak hours identification

### Settings & Administration
- **Pharmacy Information**: License, contact details, location
- **User Management**: Role-based access control (Admin, Pharmacist, Staff)
- **Notifications**: Customizable alerts for stock, expiry, sales
- **Security**: Password management, 2FA support
- **Preferences**: Language, timezone, date format
- **Data & Backup**: Automated backups, manual export (CSV/JSON)

## 👥 Multi-Tenant Architecture

Each pharmacy operates as an isolated tenant with:
- Separate data storage (localStorage-based in frontend version)
- Independent user management
- Customizable settings per pharmacy
- Secure authentication per tenant

## 🔐 Demo Credentials

### Tenant 1: HealthPlus Pharmacy
- **Admin**: admin@healthplus.com / admin123
- **Pharmacist**: pharmacist@healthplus.com / pharma123

### Tenant 2: CareRx Pharmacy
- **Admin**: admin@carerx.com / admin123

### Tenant 3: WellnessMed Pharmacy
Available for testing

## 🎨 User Roles & Permissions

### Admin
- Full access to all features
- User management
- System settings
- Data backup and export

### Pharmacist
- Dashboard access
- Inventory management
- Sales & dispensing
- Analytics viewing

### Staff
- Dashboard viewing
- Inventory browsing
- Limited sales access

## 📱 PWA Features

- **Offline Support**: Works without internet connection
- **Installable**: Add to home screen on mobile/desktop
- **Responsive Design**: Optimized for all screen sizes
- **Native Feel**: App-like experience with smooth transitions
- **Touch Optimized**: Mobile-first interaction design
- **Safe Area Support**: Handles device notches and rounded corners

## 🛠️ Technology Stack

- **React 18**: Component-based UI framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Data visualization
- **Lucide React**: Icon library
- **LocalStorage**: Client-side data persistence

## 📊 Data Models

### Medication
- Name, Strength, Category
- Manufacturer, Batch Number
- Stock levels (current, minimum)
- Price per unit
- Expiry date
- Storage location

### Sale Transaction
- Transaction ID, Date, Time
- Patient information
- Pharmacist details
- Line items (medications, quantities)
- Payment method
- Total amount

### User
- Name, Email, Role
- Tenant association
- Authentication credentials
- Permissions

## 🎯 Key Components

### `/components/Login.tsx`
Multi-tenant authentication with demo credentials

### `/components/Dashboard.tsx`
Comprehensive overview with stats, alerts, and recent activity

### `/components/Inventory.tsx`
Full inventory management with CRUD operations

### `/components/Sales.tsx`
POS interface for prescription dispensing

### `/components/Analytics.tsx`
Visual reports and performance metrics

### `/components/Settings.tsx`
Tabbed settings interface for all configurations

## 💡 Usage Tips

1. **Quick Search**: Use the search bar in the header to find medications or orders quickly
2. **Filters**: Apply category filters in inventory to narrow down items
3. **Stock Alerts**: Monitor the dashboard for low stock and expiring items
4. **Bulk Actions**: Use import/export for managing large inventories
5. **Reports**: Check analytics regularly for business insights

## 🔄 Data Persistence

Currently uses browser localStorage for data persistence. For production use with a real backend:
- Data persists across browser sessions
- Clear browser data will reset the demo
- Each tenant's data is isolated by tenant ID

## 🚧 Future Enhancements

- Barcode scanning for medication entry
- Prescription image upload
- Supplier management
- Purchase order system
- Email/SMS notifications
- Real-time multi-user collaboration
- Advanced reporting with custom date ranges
- Integration with pharmacy management systems
- Patient medication history tracking
- Drug interaction checking

## 📝 Notes

- This is a frontend-only demonstration
- No real backend database (uses localStorage)
- Not suitable for production use with real patient data
- Not HIPAA-compliant in current form
- For production deployment, integrate with proper backend infrastructure

## 🎨 Design Philosophy

- **Clean & Minimal**: Focus on essential information
- **Data-Dense**: Maximum information in minimal space
- **Accessible**: WCAG 2.1 AA compliant color contrasts
- **Fast**: Optimized for quick interactions
- **Mobile-First**: Touch-friendly on all devices

## 📱 Progressive Web App

The platform includes a PWA manifest for installation:
- Add to home screen on mobile devices
- Standalone app mode
- Custom app icons
- Splash screen support
- App shortcuts for quick actions

---

**Built with modern web technologies for a seamless pharmacy management experience.**