# E2E Testing Framework

This repository contains end-to-end tests for the Demo Shop platform. The test suite is designed to work across multiple
implementations of the platform, ensuring consistent behavior regardless of the underlying technology stack.

## Overview

This E2E testing framework is intentionally maintained as a separate repository to support testing across multiple
interchangeable implementations of the Demo Shop platform:

1. [demo-shop-public](http://github.com/christian-wandling/demo-shop-public): Angular frontend with NestJS API
2. [demo-shop-react-ui](http://github.com/christian-wandling/demo-shop-react-ui): React implementation of the frontend
3. [demo-shop-dotnet-api](http://github.com/christian-wandling/demo-shop-dotnet-api): ASP.NET Core implementation of the API

By keeping the E2E tests independent of any specific implementation, we can verify that all versions of the platform 
adhere to the same functional requirements and provide a consistent user experience.

```
e2e/                # Test specifications organized by feature
├── specs/
│   ├── navigation/ # Navigation-related tests
│   ├── order/      # Order functionality tests
│   ├── product/    # Product browsing and management tests
│   └── shopping/   # Shopping cart and checkout tests

src/
├── constants/      # Test constants and enums
├── fixtures/       # Test fixtures and mock data
├── page-objects/   # Page object models organized by feature
│   ├── auth/
│   ├── navigation/
│   ├── order/
│   ├── product/
│   └── shopping/
├── types/          # TypeScript type definitions
└── utils/          # Helper utilities for testing
```

## Getting Started

### Prerequisites

- <a href="https://nodejs.org/en" target="\_blank">Node.js 22</a> or later
- <a href="https://www.npmjs.com/" target="\_blank">npm</a> or <a href="https://pnpm.io/installation" target="\_blank">pnpm</a>
- Access to one of the Demo Shop implementations listed above

### Installation

1. Clone the repository
```
git clone https://github.com/christian-wandling/demo-shop-e2e.git
```

2. Navigate to the project directory
```
cd demo-shop-e2e
```

3. Install dependencies
```
npm install
```

### Configuration

Before running tests, follow the guides in the demo-shop repositories listed above. You will need both a running 
frontend and api for the tests to work.

```
USERNAME=YOUR_DEMO_SHOP_EMAIL
PASSWORD=YOUR_DEMO_SHOP_PASSWORD
BASE_URL=DEMO_SHOP_FRONTEND_URL
```

### Running Tests

Run all tests
```
npm test
```

## Design Philosophy

This E2E framework follows these key principles:

- Implementation Agnostic: Tests focus on user-facing functionality, not implementation details
- Page Object Model: Separation between test logic and page interactions
- Reusability: Common utilities and helpers to minimize code duplication
- Maintainability: Clear organization by feature domain