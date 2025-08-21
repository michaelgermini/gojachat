# GojaChat 📱💬

> **A modern, real-time messaging application demonstrating full-stack integration**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

GojaChat is a comprehensive messaging platform that showcases modern web and mobile development practices. Built with React, React Native, and Node.js, it demonstrates real-time communication, state management, and cross-platform development.

## ✨ Key Features

- **🌐 Web Application** - Real-time chat with responsive design
- **📱 Mobile Application** - Native interface with push notifications
- **🔌 Real-time Communication** - WebSocket-based messaging
- **🎯 Type Safety** - Full TypeScript implementation
- **📊 State Management** - Redux Toolkit for predictable state
- **🚀 CI/CD Pipeline** - Automated deployment with GitHub Actions
- **🧪 Testing** - Comprehensive test coverage
- **📚 Documentation** - Complete API and deployment guides

## 📁 Project Structure

```
gojachat/
├── packages/
│   ├── api/          # Backend API (JSON Server + Socket.io)
│   ├── web/          # React Web Application
│   └── mobile/       # React Native Mobile App
├── .github/          # GitHub Actions & CI/CD
├── docs/             # Documentation
├── CONTRIBUTING.md   # Contribution guidelines
├── CODE_OF_CONDUCT.md # Community standards
├── SECURITY.md       # Security policy
└── CHANGELOG.md      # Version history
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/michaelgermini/gojachat.git
cd gojachat

# Install all dependencies
npm run install:all

# Start development environment
npm run dev
```

### Demo Accounts

Use these accounts to test the application:

| User | Email | Password |
|------|-------|----------|
| Alice | alice@gojachat.com | password |
| Bob | bob@gojachat.com | password |
| Charlie | charlie@gojachat.com | password |
| Diana | diana@gojachat.com | password |

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API and web app in development mode |
| `npm run dev:api` | Start only the API server |
| `npm run dev:web` | Start only the web application |
| `npm run dev:mobile` | Start the mobile application |
| `npm run build` | Build all packages for production |
| `npm run test` | Run all tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Check code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |

## 🛠️ Technology Stack

### Backend
- **JSON Server** - Mock REST API
- **Socket.io** - Real-time communication
- **TypeScript** - Type safety
- **Jest** - Testing framework

### Frontend Web
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time communication

### Mobile
- **React Native** - Cross-platform mobile
- **Expo** - Development platform
- **Redux Toolkit** - State management
- **React Navigation** - Navigation

### Development & DevOps
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Web deployment
- **EAS** - Mobile deployment

## 🎯 Features

### 🌐 Web Application
- ✅ **Real-time messaging** with WebSocket
- ✅ **Conversation management** with threads
- ✅ **Responsive design** for all devices
- ✅ **Push notifications** for new messages
- ✅ **User authentication** system
- ✅ **Message search** functionality
- ✅ **Modern UI/UX** inspired by popular chat apps

### 📱 Mobile Application
- ✅ **Native interface** with React Native
- ✅ **Push notifications** for real-time updates
- ✅ **Offline mode** support
- ✅ **File sharing** capabilities
- ✅ **Cross-platform** (iOS & Android)
- ✅ **Smooth animations** and transitions

### 🔌 Backend API
- ✅ **RESTful endpoints** for all operations
- ✅ **WebSocket support** for real-time features
- ✅ **User authentication** and authorization
- ✅ **Message persistence** and history
- ✅ **Notification system** for alerts

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage
- **Unit Tests** - Component and utility testing
- **Integration Tests** - API endpoint testing
- **E2E Tests** - End-to-end user flows
- **Type Checking** - TypeScript validation

## 🚀 Deployment

### 🌐 Web Application (Vercel)
- **Automatic deployment** via GitHub Actions
- **Preview deployments** for each Pull Request
- **Production deployment** on main branch merge
- **Global CDN** for fast loading worldwide

### 📱 Mobile Application (Expo)
- **Automatic builds** via EAS (Expo Application Services)
- **Development builds** for testing
- **Production builds** for app stores
- **Over-the-air updates** for quick fixes

### 🔌 API (Railway)
- **Automatic deployment** from GitHub
- **Scalable infrastructure** for production
- **SSL/TLS encryption** for security
- **Health monitoring** and logging

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

### Quick Start for Contributors

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes and add tests
5. **Commit** with conventional commits (`git commit -m 'feat: add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### Development Guidelines
- Follow our [coding standards](CONTRIBUTING.md#coding-standards)
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages

For more details, see our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

We take security seriously. Please read our [Security Policy](SECURITY.md) for reporting vulnerabilities and security best practices.

## 📚 Documentation

- **[API Documentation](docs/API.md)** - Complete API reference
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Deployment instructions
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines
- **[Security Policy](SECURITY.md)** - Security information
- **[Changelog](CHANGELOG.md)** - Version history

## 📞 Contact & Support

### 🏢 Project Maintainer
- **Name**: Michael Germini
- **GitHub**: [@michaelgermini](https://github.com/michaelgermini)
- **Email**: michael@germini.info

### 🌐 Project Links
- **Repository**: https://github.com/michaelgermini/gojachat
- **Issues**: https://github.com/michaelgermini/gojachat/issues
- **Discussions**: https://github.com/michaelgermini/gojachat/discussions

### 🆘 Support Channels
- **GitHub Issues** - For bug reports and feature requests
- **GitHub Discussions** - For questions and community support
- **Email Support** - For security issues and private matters

### 📧 Contact Information
| Purpose | Contact Method |
|---------|----------------|
| **General Inquiries** | [GitHub Issues](https://github.com/michaelgermini/gojachat/issues) |
| **Security Issues** | [security@gojachat.com](mailto:security@gojachat.com) |
| **Contributions** | [GitHub Discussions](https://github.com/michaelgermini/gojachat/discussions) |
| **Private Matters** | [michael@germini.info](mailto:michael@germini.info) |

### 🏷️ Social Media
- **GitHub**: [@michaelgermini](https://github.com/michaelgermini)
- **LinkedIn**: [Michael Germini](https://linkedin.com/in/michaelgermini)

---

## 🙏 Acknowledgments

- Built with ❤️ to demonstrate modern full-stack development practices
- Inspired by popular messaging applications like WhatsApp and Slack
- Thanks to the open-source community for the amazing tools and libraries
- Special thanks to all contributors and supporters of this project

---

**⭐ If you find this project helpful, please give it a star on GitHub!**
