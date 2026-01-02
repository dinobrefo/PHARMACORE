# 🚀 Pharmacore GodAdmin - Quick Start Guide

## 🔐 Login

**Access the GodAdmin Panel:**
```
Email: godadmin@pharmacore.system
Password: god2024!secure
```

Upon login, you'll see a **dark-themed dashboard** (slate/purple) that's distinctly different from the pharmacy blue interface.

---

## 📊 Dashboard Overview

### **Main Navigation (Left Sidebar)**

| Section | Icon | Purpose |
|---------|------|---------|
| **Overview** | 📊 BarChart3 | Platform metrics & health dashboard |
| **Tenants** | 🏢 Building2 | Manage all pharmacy organizations |
| **Master Catalog** | 💾 Database | Global drug database |
| **System Logs** | 📈 Activity | Real-time event monitoring |
| **Settings** | ⚙️ Settings | Global platform configuration |

---

## 🎯 Key Features

### **1. Platform Metrics (Overview)**

**Top Row KPIs:**
- **Total Pharmacies**: 5 organizations
- **Monthly Recurring Revenue (MRR)**: GH₵ 529.97
- **Total Users**: 52 employees across all pharmacies
- **Total Transactions**: 9,477 sales this month

**System Health:**
- API Uptime: 99.98%
- Avg Response Time: 124ms
- Error Rate: 0.02%

**Recent Activity:**
- New signups
- Subscription upgrades
- Payments received
- Support tickets

---

### **2. Tenant Management**

**The Core "God Mode" Functionality**

#### **Tenant Table Displays:**
1. Pharmacy name + owner email
2. Status badge (Active/Trial/Paused/Archived)
3. Plan tier (Basic/Professional/Enterprise)
4. Monthly revenue contribution
5. Number of users
6. Last active timestamp
7. Quick action buttons

#### **Quick Actions (Per Tenant):**

| Icon | Action | Use Case |
|------|--------|----------|
| 👁️ **Eye** | View Details | Open full tenant information modal |
| ⏸️ **Pause** | Suspend Service | "Kill switch" for non-payment/violations |
| ▶️ **Play** | Activate | Restore access after suspension |
| 👤 **UserCog** | Login As Owner | Impersonate to debug issues |

---

### **3. The "Kill Switch" (Service Control)**

**Pause Service:**
- **Purpose**: Instantly freeze a pharmacy's access
- **Use Cases**:
  - Non-payment of subscription
  - Terms of service violation
  - Security incident investigation
  - Legal/regulatory hold
- **Effect**: Users see "Subscription Suspended" message
- **Data**: All data preserved (not deleted)
- **Reversible**: Can be activated instantly

**How to Pause:**
1. Find tenant in Tenants table
2. Click ⏸️ **Pause** icon
3. Confirm action
4. Status changes to "Paused" (red badge)
5. Pharmacy users locked out immediately

**How to Reactivate:**
1. Find paused tenant
2. Click ▶️ **Play** icon
3. Confirm action
4. Status changes to "Active" (green badge)
5. Pharmacy users can log in immediately

---

### **4. Tenant Detail Modal**

**Click 👁️ Eye icon on any tenant to open:**

#### **Header:**
- Pharmacy name
- Tenant ID
- Status badge

#### **Action Bar:**
```
[Login As Admin] [Reset Password] [Pause Service] [Archive]
```

#### **Organization Details:**
- Owner Email
- Signup Date
- Region (Accra, Kumasi, etc.)
- Last Active

#### **Usage Statistics:**
- **Users**: Employee count
- **Inventory Items**: Total SKUs
- **Transactions**: Sales processed
- **Storage Used**: Database size (GB)

#### **Billing Information:**
- Current Plan
- Monthly Revenue (MRR)
- Next Billing Date
- Payment Status

---

### **5. Impersonation (Login As Owner)**

**Purpose:**
- Debug issues without customer password
- Verify reported bugs in their environment
- Provide hands-on support
- Test features with real data

**How to Use:**
1. Open Tenant Detail Modal
2. Click **Login As Admin** button
3. System creates admin session for that tenant
4. You see exact same view as their admin
5. Banner shows "Viewing as [Pharmacy Name]"
6. Click "Exit Impersonation" to return

**Security:**
- All impersonation sessions logged
- Timestamp and reason recorded
- Cannot modify passwords while impersonating
- Limited access to sensitive payment data

**Best Practice:**
- Get customer permission first (except emergencies)
- Document reason for access
- Limit session duration
- Don't modify production data without approval

---

### **6. Global Drug Catalog**

**Purpose:**
- Centralized database shared across all pharmacies
- Reduces data entry errors
- Ensures consistency
- Tracks drug usage platform-wide

#### **Current Catalog:**
- **Total Drugs**: 3 (expandable)
- **Categories**: 12 different drug types
- **Total Usage**: 1,982 across all pharmacies

#### **Sample Drugs:**
1. **Paracetamol 500mg**
   - Generic: Acetaminophen
   - Category: Analgesics
   - SKU: PAR-500
   - Usage: 847 pharmacies

2. **Amoxicillin 500mg**
   - Generic: Amoxicillin
   - Category: Antibiotics
   - SKU: AMX-500
   - Usage: 623 pharmacies

3. **Metformin 850mg**
   - Generic: Metformin HCl
   - Category: Diabetes
   - SKU: MET-850
   - Usage: 512 pharmacies

#### **How It Works:**
1. GodAdmin adds drug to global catalog
2. All pharmacies see it in their "Add Medication" dropdown
3. Pharmacies select drug and add their own:
   - Pricing
   - Stock levels
   - Batch numbers
   - Expiry dates
4. Updates to master catalog propagate metadata (not pricing)

#### **Actions:**
- **+ Add Drug**: Create new global drug entry
- **✏️ Edit**: Update drug information
- **🗑️ Delete**: Remove drug (soft delete if in use)

---

### **7. System Logs**

**Real-time platform monitoring**

#### **Log Filters:**
- **All**: Everything
- **Logins**: User authentication events
- **Transactions**: Sales/payment processing
- **Errors**: System failures
- **API Calls**: External integrations
- **Payments**: Subscription billing

#### **Log Entry Format:**
Each log shows:
- **Type Indicator**: Color-coded dot
- **Message**: Event description
- **Tenant**: Which pharmacy (or "System")
- **Timestamp**: Exact time

#### **Log Types:**

| Type | Color | Examples |
|------|-------|----------|
| **Info** | 🔵 Blue | Logins, exports, backups |
| **Success** | 🟢 Green | Payments processed, operations completed |
| **Warning** | 🟡 Amber | High API usage, approaching limits |
| **Error** | 🔴 Red | Failed operations, system errors |

#### **Sample Logs:**
```
🔵 User login: admin@healthplus.com               14:23:45  HealthPlus Pharmacy
🟢 Payment processed: GH₵ 149.99                  14:18:12  CareRx Pharmacy
🟡 High API usage detected                        14:05:33  WellnessMed Pharmacy
🔴 Database connection timeout                    13:47:21  System
🔵 Backup completed successfully                  13:30:00  System
```

---

## 🎨 Visual Design

### **Color Scheme (Distinct from Pharmacy Blue)**

**Background:**
- Primary: Slate-900 (very dark)
- Secondary: Slate-800 (dark)
- Cards: Slate-800/50 with blur effect

**Accents:**
- Primary Action: Purple-600 (buttons, active states)
- Success: Green-400/500
- Warning: Amber-400/500
- Danger: Red-400/500

**Text:**
- Primary: White (high contrast)
- Secondary: Slate-400 (labels)
- Tertiary: Slate-500 (subtle text)

**Badges:**
- Active: Green with 10% opacity background
- Trial: Blue with 10% opacity background
- Paused: Red with 10% opacity background
- Archived: Gray with 10% opacity background

---

## 📋 Common Workflows

### **Workflow 1: Investigate Customer Issue**

**Scenario:** "Customer says they can't see sales analytics"

1. Login to GodAdmin
2. Go to **Tenants**
3. Search for pharmacy name
4. Click 👁️ **View Details**
5. Check:
   - Status: Should be "Active"
   - Plan: Analytics may be Pro/Enterprise only
6. Click **Login As Admin**
7. Navigate to Analytics in their view
8. Reproduce issue
9. Document findings
10. Exit impersonation
11. Escalate or educate customer

**Total Time:** ~5 minutes

---

### **Workflow 2: Handle Non-Payment**

**Scenario:** "Subscription payment failed 3 times"

1. Login to GodAdmin
2. Go to **Tenants**
3. Find tenant by email
4. Click 👁️ **View Details**
5. Review billing info
6. Verify payment failure
7. Send payment reminder (email/SMS)
8. Wait 7 days grace period
9. If still unpaid:
   - Click ⏸️ **Pause Service**
   - Confirm action
10. Tenant sees "Subscription Suspended"
11. When payment received:
    - Click ▶️ **Activate**
12. Service restored instantly

**Total Time:** 2 minutes (pause/activate actions instant)

---

### **Workflow 3: Add Drug to Catalog**

**Scenario:** "5 pharmacies request 'Augmentin 625mg'"

1. Login to GodAdmin
2. Go to **Master Catalog**
3. Click **+ Add Drug**
4. Fill form:
   - Name: Augmentin 625mg
   - Generic: Amoxicillin + Clavulanic Acid
   - Category: Antibiotics
   - Manufacturer: GSK
   - SKU: AUG-625
5. Submit
6. Drug appears in all pharmacy dropdowns
7. Pharmacies add with their own pricing/stock

**Total Time:** 3 minutes

---

### **Workflow 4: Onboard New Pharmacy**

**Scenario:** "New customer signed up"

1. Login to GodAdmin
2. Go to **Tenants**
3. Click **+ New Pharmacy**
4. Fill form:
   - Name: MediPlus Pharmacy
   - Owner Email: admin@mediplus.com
   - Owner: Dr. James Osei
   - Region: Kumasi
   - Plan: Trial
   - License: PH-KU-2024-1234
5. Submit
6. System auto-creates tenant
7. Welcome email sent
8. Schedule onboarding call

**Total Time:** 5 minutes

---

## 🔒 Security Notes

### **Access Control:**
- Only authorized system administrators should have GodAdmin access
- Change default password immediately in production
- Enable 2FA for all GodAdmin accounts
- IP whitelist recommended
- Session timeout: 15 minutes

### **Audit Trail:**
All GodAdmin actions are logged:
- Impersonation sessions
- Status changes (pause/activate)
- Data exports
- Password resets
- System modifications

### **Data Protection:**
- Cannot view customer passwords (hashed)
- Payment methods masked in interface
- Sensitive fields encrypted at rest
- All actions require confirmation
- Destructive actions require double-confirmation

---

## 🆘 Emergency Actions

### **System-Wide Issue:**
1. Check **Overview** → System Health
2. Review **System Logs** → Filter "Errors"
3. Identify affected tenants
4. Post status update
5. Notify customers via email
6. Escalate to engineering

### **Security Incident:**
1. Immediately use **Pause Service** on affected tenant
2. Force password reset
3. Review **System Logs** for suspicious activity
4. Contact security team
5. Document incident
6. Notify customer

### **Critical Bug:**
1. Check impact (how many tenants affected?)
2. Use feature flags to disable broken feature
3. Notify affected customers
4. Deploy hotfix
5. Test thoroughly
6. Re-enable feature

---

## 📊 Key Metrics to Monitor Daily

### **Every Morning:**
- ✅ API Uptime (should be 99.9%+)
- ✅ Error Rate (should be <0.1%)
- ✅ MRR Growth (positive trend?)
- ✅ New Signups (welcome them)
- ✅ Failed Payments (follow up)
- ✅ Critical Errors (investigate)

### **Every Week:**
- ✅ Churn analysis (who left and why?)
- ✅ Top 5 most active tenants
- ✅ Storage usage trends
- ✅ Feature requests from customers
- ✅ Support ticket patterns

---

## 🎓 Best Practices

### **DO:**
- ✅ Document all major actions
- ✅ Get customer consent before impersonation
- ✅ Monitor system health daily
- ✅ Respond to critical issues within 1 hour
- ✅ Keep master catalog updated
- ✅ Review audit logs regularly
- ✅ Test features before enabling for all

### **DON'T:**
- ❌ Pause service without warning (except emergencies)
- ❌ Access customer data without reason
- ❌ Make changes during business hours (8am-5pm)
- ❌ Share GodAdmin credentials
- ❌ Ignore system alerts
- ❌ Modify production data manually
- ❌ Leave impersonation sessions open

---

## 📞 Quick Reference

### **Status Badges:**
```
🟢 Active     - Fully operational, paying customer
🔵 Trial      - Free trial period
🔴 Paused     - Service suspended
⚪ Archived   - Soft deleted, data retained
```

### **Plan Tiers:**
```
Trial:        Free, 14 days, limited features
Basic:        GH₵ 79.99/mo, 5 users, 500 items
Professional: GH₵ 149.99/mo, 15 users, 2000 items
Enterprise:   GH₵ 299.99/mo, unlimited
```

### **Support Contacts:**
```
Emergency:    emergency@pharmacore.com (15 min response)
Security:     security@pharmacore.com (30 min response)
Billing:      billing@pharmacore.com (4 hour response)
General:      support@pharmacore.com (24 hour response)
```

---

## 🎉 Summary

**The GodAdmin Panel gives you complete control over:**

✅ All pharmacy organizations (tenants)  
✅ Service activation/suspension ("kill switch")  
✅ Impersonation for debugging  
✅ Global drug catalog management  
✅ Real-time system monitoring  
✅ Platform health metrics  
✅ Revenue analytics (MRR tracking)  

**This is your command center for the entire Pharmacore SaaS platform.** 🚀

---

**Pro Tip:** Bookmark these common actions:
- Pause/Activate Service: Most frequent emergency action
- Login As Owner: Best debugging tool
- System Logs → Errors: Daily monitoring essential
- Overview Dashboard: Your morning health check

**For full documentation, see:** `/GODADMIN_DOCUMENTATION.md`

---

**Pharmacore GodAdmin v1.0**  
*The Power to Manage Thousands of Pharmacies* 💊
