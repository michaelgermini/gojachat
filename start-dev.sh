#!/bin/bash

echo "🚀 Starting GojaChat in development mode..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies if necessary
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start API and web app
echo "🌐 Starting API and web application..."
npm run dev

echo "✅ GojaChat is ready!"
echo "📱 Web: http://localhost:3000"
echo "🔌 API: http://localhost:3001"
echo "📱 Mobile: npm run dev:mobile (in another terminal)"
