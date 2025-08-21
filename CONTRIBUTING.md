# Contributing to GojaChat

Thank you for your interest in contributing to GojaChat! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- For mobile development: Expo CLI

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/gojachat.git
   cd gojachat
   ```
3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/michaelgermini/gojachat.git
   ```

## Development Setup

### Install Dependencies

```bash
# Install all dependencies for all packages
npm run install:all
```

### Start Development Environment

```bash
# Start all services (API + Web)
npm run dev

# Or start individual services
npm run dev:api    # API only
npm run dev:web    # Web app only
npm run dev:mobile # Mobile app only
```

### Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all packages for production
- `npm run test` - Run all tests
- `npm run lint` - Run ESLint on all packages
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Define proper types for all functions and variables
- Use interfaces for object shapes
- Avoid `any` type - use proper typing

### React/React Native

- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Implement proper error boundaries

### Code Style

- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add JSDoc comments for complex functions

### File Naming

- Use PascalCase for components: `UserProfile.tsx`
- Use camelCase for utilities: `formatDate.ts`
- Use kebab-case for files: `user-profile.css`

## Testing

### Writing Tests

- Write unit tests for all utilities and components
- Use Jest and React Testing Library
- Aim for good test coverage
- Test both success and error scenarios

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests for specific package
npm run test:api
npm run test:web
npm run test:mobile
```

### Test Structure

```typescript
// Example test structure
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interactions', () => {
    // Test implementation
  });

  it('should handle errors gracefully', () => {
    // Test implementation
  });
});
```

## Pull Request Process

### Before Submitting

1. **Update your fork**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**:
   - Follow coding standards
   - Write tests for new functionality
   - Update documentation if needed

4. **Test your changes**:
   ```bash
   npm run lint
   npm run test
   npm run type-check
   ```

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Format

Use conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Submitting PR

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a Pull Request on GitHub

3. Fill out the PR template with:
   - Description of changes
   - Screenshots (if UI changes)
   - Test instructions
   - Related issues

4. Request review from maintainers

### PR Review Process

- All PRs require at least one review
- Address review comments promptly
- Maintainers may request changes
- PRs will be merged after approval

## Issue Reporting

### Before Creating an Issue

1. Check existing issues to avoid duplicates
2. Search the documentation for solutions
3. Try to reproduce the issue locally

### Issue Template

When creating an issue, please include:

- **Title**: Clear, descriptive title
- **Description**: Detailed description of the problem
- **Steps to reproduce**: Step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, Node.js version, browser, etc.
- **Screenshots**: If applicable

### Bug Reports

For bug reports, please include:

- Error messages and stack traces
- Console logs
- Network tab information (if relevant)
- Steps to reproduce

### Feature Requests

For feature requests, please include:

- Use case description
- Expected benefits
- Implementation suggestions (if any)
- Mockups or wireframes (if applicable)

## Development Guidelines

### API Development

- Follow RESTful conventions
- Use proper HTTP status codes
- Implement proper error handling
- Add input validation
- Write API documentation

### Frontend Development

- Follow responsive design principles
- Implement proper accessibility
- Optimize for performance
- Use proper state management
- Handle loading and error states

### Mobile Development

- Follow platform-specific guidelines
- Test on multiple devices
- Implement proper navigation
- Handle offline scenarios
- Optimize for performance

## Getting Help

- Check the documentation in the `docs/` folder
- Search existing issues and discussions
- Ask questions in GitHub Discussions
- Contact maintainers for urgent issues

## Recognition

Contributors will be recognized in:

- Project README
- Release notes
- GitHub contributors page

Thank you for contributing to GojaChat! 🚀
