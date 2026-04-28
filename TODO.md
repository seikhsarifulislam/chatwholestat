# APK Build for Play Store - TODO

## Current Progress
- [x] Plan approved
- [x] eas.json created
- [x] Dependencies installed
- [x] EAS CLI installing

## Steps to Complete

### 1. Setup EAS Config
- [x] Create `eas.json` ✅ (fixed validation)

### 2. App Config Updates
- [ ] Add icons/splash to app.json (optional, warnings only)

### 3. Install Dependencies
```
cd chatwholestat
npm install
```
- [x] ✅ Completed

### 4. Install EAS CLI
```
npm install -g eas-cli
```
- [x] ✅ Running/Complete

### 5. Expo Account
```
eas login
```
(Use your Expo account)

### 6. Configure Builds
```
cd chatwholestat
eas build:configure
```
- [ ] Now valid!

### 7. Preview APK (Test)
```
eas build --platform android --profile preview
```
Download APK from Expo dashboard.

### 8. Production APK/AAB (Play Store)
```
eas build --platform android --profile production
```
Requires keystore setup via `eas credentials`.

### 9. Play Store Upload
Upload AAB/APK to Google Play Console.
