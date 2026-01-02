# PharmaSys PWA Documentation

## Overview
PharmaSys is now a fully-featured Progressive Web App (PWA) with native app-like capabilities, offline functionality, and mobile-first responsive design.

## Architecture

### Technical Stack
- **Framework**: React with TypeScript
- **UI Library**: MUI Joy UI for delightful, modern aesthetics
- **Component Philosophy**: ShadCN approach with Radix UI primitives
- **Styling**: Tailwind CSS v4 + Joy UI theme system
- **PWA Features**: Service Workers, Offline Support, Installability

### Design System

#### Joy UI Integration
The app uses MUI Joy UI's theme system for:
- Consistent color palettes (primary, success, warning, danger, neutral)
- Typography scale
- Border radius tokens
- Shadow system
- Component variants

#### Mobile-First Responsive Design
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Touch-optimized interactions (44px minimum touch targets)
- Adaptive layouts that work seamlessly from 320px to 4K displays
- Safe area insets for devices with notches

## PWA Features

### 1. Service Worker (`/public/service-worker.js`)
**Capabilities:**
- Caches static assets for offline access
- Network-first strategy for fresh data
- Fallback to cache when offline
- Background sync for pending sales transactions
- Automatic cache cleanup on updates

**Cache Strategy:**
- Static assets (manifest, icons) - pre-cached on install
- API responses - cached after first fetch
- Dynamic content - network first, cache fallback

### 2. Offline Support

#### Offline Sales Sync (`/hooks/useOfflineSync.ts`)
When internet connection is lost:
1. Sales are stored locally in `localStorage`
2. Visual indicator shows offline status
3. When connection restored, sales automatically sync
4. Background sync API ensures no data loss

#### Usage:
```typescript
import { useOfflineSync } from '../hooks/useOfflineSync';

const { pendingSales, addPendingSale, syncPendingSales } = useOfflineSync();

// Add a sale while offline
addPendingSale(saleData);

// Manually trigger sync (automatic on reconnect)
syncPendingSales();
```

### 3. Installability

#### PWA Install Prompt (`/components/PWAInstallPrompt.tsx`)
- Detects if app is installable
- Shows beautiful installation prompt
- Dismissible (saves preference)
- Lists benefits:
  - Works offline
  - Faster loading
  - Home screen installation

#### Installation Process:
1. User visits site in compatible browser
2. Install prompt appears at bottom
3. Click "Install Now" button
4. App added to home screen
5. Opens in standalone mode (no browser UI)

#### Supported Platforms:
- Android: Chrome, Edge, Samsung Internet
- iOS: Safari (Add to Home Screen)
- Desktop: Chrome, Edge (Windows/Mac/Linux)

### 4. App Shortcuts
Quick access to key features from home screen:
- Dashboard
- Inventory Management
- New Sale Transaction
- Analytics

Configure in `manifest.json` → `shortcuts` array

### 5. Status Indicators

#### Offline Indicator (`/components/OfflineIndicator.tsx`)
Shows real-time connectivity status:
- **Orange**: Offline mode active
- **Blue**: Syncing pending transactions
- **Green**: Back online with pending items

## Mobile Optimizations

### Touch Interactions
```css
/* Touch-friendly minimum sizes */
button, a, input[type="checkbox"] {
  min-height: 44px;
  min-width: 44px;
}

/* Remove tap highlight */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Smooth scrolling */
body {
  -webkit-overflow-scrolling: touch;
}
```

### Prevent Pull-to-Refresh
```css
body {
  overscroll-behavior-y: contain;
}
```

### Safe Area Insets (for notched devices)
```css
body {
  padding-left: max(0px, env(safe-area-inset-left));
  padding-right: max(0px, env(safe-area-inset-right));
}
```

## Custom Animations

### PWA-Specific Animations
```css
.animate-slide-up    /* Bottom-up entrance */
.animate-slide-down  /* Top-down entrance */
.animate-fade-in     /* Smooth fade in */
.active:scale-98     /* Button press effect */
```

## Theme Configuration

### Joy UI Theme (`/theme/joyTheme.ts`)
```typescript
export const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { /* Blue scale */ },
        success: { /* Green scale */ },
        warning: { /* Orange scale */ },
        danger: { /* Red scale */ },
        neutral: { /* Gray scale */ }
      }
    }
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px'
  }
});
```

### Using Theme in Components
```typescript
import { CssVarsProvider } from '@mui/joy/styles';
import { joyTheme } from './theme/joyTheme';

<CssVarsProvider theme={joyTheme}>
  <App />
</CssVarsProvider>
```

## Performance Optimizations

### 1. Lazy Loading
Components load on-demand to reduce initial bundle size

### 2. Code Splitting
Separate bundles for each major feature (Dashboard, Inventory, Sales, etc.)

### 3. Image Optimization
- WebP format where supported
- Lazy loading for images below fold
- Responsive image sizing

### 4. Caching Strategy
```javascript
// Network first for fresh data
fetch(request)
  .then(cache)
  .catch(serveCached)
```

## Deployment Checklist

### Pre-Deployment
- [ ] Generate app icons (192x192, 512x512)
- [ ] Create screenshots (wide: 1280x720, narrow: 750x1334)
- [ ] Test on multiple devices/browsers
- [ ] Verify offline functionality
- [ ] Test install flow

### Assets Required
```
/public/
  ├── icon-192.png
  ├── icon-512.png
  ├── screenshot-wide.png
  ├── screenshot-narrow.png
  ├── manifest.json
  └── service-worker.js
```

### manifest.json Configuration
```json
{
  "name": "PharmaSys - Pharmacy Management Platform",
  "short_name": "PharmaSys",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#2563eb",
  "background_color": "#ffffff"
}
```

### HTTPS Requirement
**Critical**: PWAs require HTTPS in production
- Service Workers only work over HTTPS
- Exception: localhost for development

## Testing

### Desktop Testing
```bash
# Chrome DevTools
1. Open DevTools → Application
2. Check "Service Workers" status
3. Test "Offline" mode
4. Verify "Manifest" configuration
```

### Mobile Testing
```bash
# Android Chrome
1. Visit site
2. Menu → "Add to Home Screen"
3. Verify icon and name
4. Open app from home screen
5. Test offline mode

# iOS Safari
1. Visit site
2. Share → "Add to Home Screen"
3. Verify icon and name
4. Open app from home screen
```

### Lighthouse Audit
Run PWA audit for compliance:
```bash
# Chrome DevTools → Lighthouse
- Select "Progressive Web App"
- Run audit
- Target score: 90+
```

## Troubleshooting

### Service Worker Not Updating
```javascript
// Force update
navigator.serviceWorker.getRegistration()
  .then(reg => reg.update());
```

### Clear Cache
```javascript
// Clear all caches
caches.keys().then(keys => {
  keys.forEach(key => caches.delete(key));
});
```

### Debug Offline Sync
```javascript
// Check pending sales
const pending = localStorage.getItem('pending_sales');
console.log(JSON.parse(pending));
```

## Best Practices

### 1. Offline-First Mindset
- Always assume connectivity issues
- Queue actions when offline
- Provide clear status feedback
- Auto-sync when online

### 2. Performance
- Minimize bundle size
- Lazy load non-critical features
- Optimize images
- Use service worker caching

### 3. User Experience
- Clear offline indicators
- Smooth animations
- Touch-optimized controls
- Responsive layouts

### 4. Data Integrity
- Validate before syncing
- Handle conflicts gracefully
- Provide retry mechanisms
- Log sync errors

## Future Enhancements

### Planned Features
- [ ] Push notifications for low stock alerts
- [ ] Biometric authentication
- [ ] Camera barcode scanning
- [ ] Share API integration
- [ ] Web Bluetooth for POS hardware
- [ ] Advanced background sync strategies

### Performance Goals
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Lighthouse PWA score > 95
- [ ] Bundle size < 200KB gzipped

## Support

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Samsung Internet 14+

### Device Support
- ✅ iOS 14+
- ✅ Android 8+
- ✅ Windows 10+
- ✅ macOS 10.15+
- ✅ Linux (Chromium-based browsers)

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Framework**: React + TypeScript + MUI Joy UI  
**License**: Proprietary
