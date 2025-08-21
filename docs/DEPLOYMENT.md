# Deployment Guide - GojaChat

## Overview

This guide covers the deployment process for all components of the GojaChat application:
- **Web Application** (React) - Deployed on Vercel
- **Mobile Application** (React Native) - Deployed via Expo
- **API** (JSON Server) - Deployed on Railway or similar

## Web Application Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Steps

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   ```

2. **Configure Build Settings**
   - **Framework Preset**: Create React App
   - **Build Command**: `cd packages/web && npm run build`
   - **Output Directory**: `packages/web/build`
   - **Install Command**: `npm run install:all`

3. **Environment Variables**
   ```env
   REACT_APP_API_URL=https://your-api-url.com
   REACT_APP_SOCKET_URL=https://your-api-url.com
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

### Automatic Deployment
The project includes GitHub Actions for automatic deployment:
- **Preview**: Every PR creates a preview deployment
- **Production**: Merging to main triggers production deployment

## Mobile Application Deployment (Expo)

### Prerequisites
- Expo account
- EAS CLI installed

### Steps

1. **Install EAS CLI**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure EAS**
   ```bash
   cd packages/mobile
   eas build:configure
   ```

4. **Build for Development**
   ```bash
   eas build --platform all --profile development
   ```

5. **Build for Production**
   ```bash
   eas build --platform all --profile production
   ```

6. **Submit to Stores**
   ```bash
   eas submit --platform all
   ```

## API Deployment (Railway)

### Prerequisites
- Railway account
- Railway CLI

### Steps

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd packages/api
   railway init
   ```

4. **Configure Environment**
   ```env
   PORT=3001
   NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   railway up
   ```

## Environment Configuration

### Web Application (.env)
```env
REACT_APP_API_URL=https://your-api-url.com
REACT_APP_SOCKET_URL=https://your-api-url.com
GENERATE_SOURCEMAP=false
```

### Mobile Application (app.config.js)
```javascript
export default {
  expo: {
    extra: {
      apiUrl: process.env.API_URL || 'https://your-api-url.com',
      socketUrl: process.env.SOCKET_URL || 'https://your-api-url.com',
    },
  },
};
```

### API (.env)
```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-web-url.com
```

## CI/CD Pipeline

### GitHub Actions Workflow

The project includes a comprehensive CI/CD pipeline:

1. **Code Quality Checks**
   - ESLint linting
   - Prettier formatting
   - TypeScript type checking

2. **Testing**
   - Unit tests for all packages
   - Integration tests for API
   - E2E tests for web application

3. **Build & Deploy**
   - Web: Automatic deployment to Vercel
   - Mobile: Automatic build via EAS
   - API: Automatic deployment to Railway

### Workflow Triggers
- **Push to main**: Production deployment
- **Pull Request**: Preview deployment
- **Release tag**: Production release

## Monitoring & Analytics

### Web Application
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking and performance monitoring

### Mobile Application
- **Expo Analytics**: Usage analytics
- **Sentry**: Crash reporting

### API
- **Railway Metrics**: Performance monitoring
- **Health Checks**: `/health` endpoint for monitoring

## Security Considerations

### Environment Variables
- Never commit sensitive data to version control
- Use environment variables for all configuration
- Rotate API keys regularly

### CORS Configuration
```javascript
// API CORS settings
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};
```

### SSL/TLS
- All production deployments use HTTPS
- Configure SSL certificates properly
- Use secure WebSocket connections (WSS)

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable naming conventions
   - Verify variable values are correct

3. **CORS Errors**
   - Update CORS configuration
   - Check domain whitelist
   - Verify SSL certificate validity

### Support
- Check the project's GitHub Issues
- Review deployment platform documentation
- Contact the development team

## Performance Optimization

### Web Application
- Enable code splitting
- Optimize bundle size
- Implement lazy loading
- Use CDN for static assets

### Mobile Application
- Optimize image assets
- Implement proper caching
- Minimize bundle size
- Use performance monitoring tools

### API
- Implement proper caching
- Optimize database queries
- Use compression middleware
- Monitor response times
