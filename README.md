# 📊 StatsMaster — React Native Statistics Learning App

A complete Android/iOS statistics learning app built with **Expo + React Native + Firebase**.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🔐 Authentication | Email/Password Sign Up, Sign In, Forgot Password |
| 📚 10 Chapters | Beginner → Advanced statistics curriculum |
| 📖 31 Topics | 200+ pages of structured content |
| 🧪 150+ Quiz Questions | Per-topic quizzes with instant feedback |
| 🧠 Practice Quiz | Random / Chapter / Quick Fire / Marathon modes |
| 📐 Formula Sheet | 30+ formulas by category with search |
| 📖 Glossary | 60+ statistical terms with definitions |
| 📈 Progress Tracking | Firebase-backed per-topic completion |
| ⭐ XP & Levels | Gamified learning with experience points |
| 🔖 Bookmarks | Save topics for quick access |
| 🏆 Quiz History | Last 50 quiz attempts with scores |

---

## 🐛 Fixes Applied (v1.0.1)

1. **`index.js` added** — was missing; `registerRootComponent` now wires Expo correctly.
2. **`package.json` main** changed from `"expo/AppEntry.js"` → `"index.js"`.
3. **`firebase.js`** — hot-reload-safe dual-init guard added (`getApps()` check + try/catch).
4. **`AuthContext.js`** — all Firebase calls wrapped in try/catch; app no longer crashes with placeholder config.
5. **`app.json`** — removed references to missing asset files (`icon.png`, `splash.png`, `favicon.png`, `adaptive-icon.png`, `google-services.json`) that caused build warnings/crashes.
6. **Removed unused imports** — `react-native-vector-icons`, `react-native-progress`, `react-native-chart-kit` removed from `package.json` (app uses `@expo/vector-icons` only).

---

## 🚀 Quick Start

### 1. Prerequisites

```bash
node --version   # v18+ required
```

### 2. Install Dependencies

```bash
cd StatsApp
npm install
```

### 3. Firebase Setup (Required for auth & progress sync)

#### A. Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click **"Add project"** → name it `stats-master` → Create

#### B. Enable Authentication
1. Firebase Console → **Authentication** → Get started
2. **Sign-in method** → Enable **Email/Password** → Save

#### C. Create Firestore Database
1. Firebase Console → **Firestore Database** → Create database
2. Choose **"Start in production mode"** → Select your region → Done
3. Go to **Rules** tab and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

#### D. Get Web App Config
1. Firebase Console → ⚙️ **Project Settings** → **Your apps**
2. Click **"</>  Web"** → Register app → name it → Register
3. Copy the `firebaseConfig` object

#### E. Add Config to App
Open `src/config/firebase.js` and replace the placeholder values:

```js
const firebaseConfig = {
  apiKey:            "YOUR_ACTUAL_API_KEY",
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef",
};
```

### 4. Run the App

```bash
npx expo start
```

Then press:
- `a` → Android emulator / device
- `i` → iOS simulator (Mac only)
- `w` → Web browser (limited)
- Scan QR code with **Expo Go** app

---

## 📁 Project Structure

```
StatsApp/
├── index.js                    # ← Entry point (registerRootComponent)
├── App.js                      # Root component
├── app.json                    # Expo config
├── babel.config.js
├── package.json
└── src/
    ├── config/
    │   └── firebase.js         # ← Add your Firebase config here
    ├── context/
    │   └── AuthContext.js      # Auth state + Firestore helpers
    ├── navigation/
    │   └── AppNavigator.js     # Stack + Tab navigators
    ├── screens/
    │   ├── auth/
    │   │   ├── LoginScreen.js
    │   │   ├── RegisterScreen.js
    │   │   └── ForgotPasswordScreen.js
    │   └── main/
    │       ├── HomeScreen.js
    │       ├── ChapterDetailScreen.js
    │       ├── TopicDetailScreen.js
    │       ├── PracticeQuizScreen.js
    │       ├── FormulaScreen.js
    │       └── ProfileScreen.js
    ├── components/
    │   └── ProgressBar.js
    ├── data/
    │   └── content.js          # 10 chapters, 31 topics, formulas, glossary
    └── utils/
        └── theme.js            # Colors, spacing, shadows
```
