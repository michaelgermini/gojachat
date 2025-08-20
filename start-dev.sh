#!/bin/bash

echo "🚀 Démarrage de GojaChat en mode développement..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 18+"
    exit 1
fi

# Vérifier la version de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ est requis. Version actuelle: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) détecté"

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Démarrer l'API et l'app web
echo "🌐 Démarrage de l'API et de l'application web..."
npm run dev

echo "✅ GojaChat est prêt !"
echo "📱 Web: http://localhost:3000"
echo "🔌 API: http://localhost:3001"
echo "📱 Mobile: npm run dev:mobile (dans un autre terminal)"
