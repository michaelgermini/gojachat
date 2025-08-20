# GojaChat 📱💬

A simple messaging application to demonstrate front ↔ back integration.

## 🚀 Features

- **Web (React)** : Real-time chat with threads
- **Mobile (React Native)** : Push notifications and lightweight interface
- **Mocked API** with JSON Server
- **Clean and typed code** (TypeScript)
- **Simple CI/CD** (GitHub Actions + Vercel/Expo)
- **Best practices** (lint, format, unit tests)
- **Optimized state management** with Redux Toolkit
- **UI/UX inspired** by WhatsApp / Slack

## 📁 Project Structure

```
gojachat/
├── packages/
│   ├── api/          # API mockée (JSON Server)
│   ├── web/          # Application React Web
│   └── mobile/       # Application React Native
├── .github/          # GitHub Actions
└── docs/             # Documentation
```

## 🛠️ Installation

```bash
# Clone the project
git clone <repository-url>
cd gojachat

# Install all dependencies
npm run install:all

# Start development
npm run dev
```

## 🚀 Available Scripts

- `npm run dev` - Starts API and web app in development mode
- `npm run dev:api` - Starts only the API
- `npm run dev:web` - Starts only the web app
- `npm run dev:mobile` - Starts the mobile app
- `npm run build` - Production build
- `npm run test` - Runs all tests
- `npm run lint` - Checks code with ESLint
- `npm run format` - Formats code with Prettier

## 🌐 Technologies Used

### Backend
- **JSON Server** - Mocked API
- **TypeScript** - Static typing
- **Jest** - Unit tests

### Frontend Web
- **React 18** - User interface
- **TypeScript** - Static typing
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Socket.io** - Real-time communication

### Mobile
- **React Native** - Mobile application
- **Expo** - Development framework
- **Redux Toolkit** - State management
- **React Navigation** - Navigation

### Development Tools
- **ESLint** - Linting
- **Prettier** - Formatting
- **Husky** - Git hooks
- **GitHub Actions** - CI/CD

## 📱 Main Features

### Web
- ✅ Real-time chat
- ✅ Conversation threads
- ✅ Responsive interface
- ✅ Push notifications
- ✅ User management
- ✅ Message search

### Mobile
- ✅ Native interface
- ✅ Push notifications
- ✅ Real-time synchronization
- ✅ Offline mode
- ✅ File sharing

## 🧪 Tests

```bash
# Unit tests
npm run test

# Tests avec couverture
npm run test:coverage
```

## 📦 Déploiement

### Web (Vercel)
- Déploiement automatique via GitHub Actions
- Preview pour chaque PR
- Production sur merge main

### Mobile (Expo)
- Build automatique via EAS
- Distribution via Expo Go
- Stores (iOS/Android) via EAS Submit

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- Développé avec ❤️ pour démontrer l'intégration front ↔ back
