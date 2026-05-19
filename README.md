# Moonlit Sichuan Restaurant Web App

Moonlit Sichuan is a full-stack restaurant website built with Next.js. It presents the restaurant brand, menu, locations, and an ordering-oriented experience with authentication, cart state, product customization, checkout data models, and PayPal integration.

This repository is the order-enabled version of the project.

Current version live demo: https://moonlit-sichuan.vercel.app/

The web version without the `order` functionality has been deployed on Vercel:

- Live demo: https://restaurant-web-app-basic.vercel.app/
- Repository: https://github.com/JayceeWU/Restaurant-Web-App-Basic

## Features

- Public restaurant website with home, menu, locations, and about pages
- Responsive navigation for desktop and mobile
- Product menu grouped by category, with featured items
- Order menu with product detail dialogs, item customization UI, and cart drawer
- Session-based cart support before sign-in, with cart ownership linked after login
- Email/password sign-up and sign-in
- Google OAuth sign-in support
- User address and payment preference data models
- Prisma-backed PostgreSQL data layer for users, products, categories, carts, orders, order items, reviews, and customizations
- PayPal order creation and capture helper functions
- Seed data for restaurant categories, menu items, customizations, and test users

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI / shadcn-style UI components
- NextAuth.js 5 beta
- Prisma 7
- Neon PostgreSQL
- PayPal Checkout API
- Jest

## Project Structure

```text
src/
  app/                  Next.js routes and layouts
    (root)/             Public website pages
    order/              Order menu and checkout routes
    user/               User profile flows
    api/auth/           NextAuth route handler
  components/           Shared UI, layout, product, header, and form components
  db/                   Prisma client, seed script, and sample data
  email/                Purchase receipt email templates
  lib/                  Server actions, validators, PayPal helpers, constants
  tests/                Jest tests
  types/                Shared TypeScript types
prisma/
  schema.prisma         Database schema
  migrations/           Prisma migrations
public/
  image/                Logo, video, menu, about, and location assets
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL database, preferably Neon because the Prisma client is configured with `@prisma/adapter-neon`

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root. Do not commit real secrets.

```env
COPYRIGHT="Jiaxuan WU (Jaycee)"
APP_NAME="Moonlit Sichuan"

DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"

GOOGLE_CLIENT_ID="replace-with-google-client-id"
GOOGLE_CLIENT_SECRET="replace-with-google-client-secret"

PAYMENT_METHODS="PayPal, Stripe, CashOnDelivery"
PAYPAL_API_URL="https://api-m.sandbox.paypal.com"
PAYPAL_CLIENT_ID="replace-with-paypal-client-id"
PAYPAL_SECRET="replace-with-paypal-secret"
```

Optional email receipt variables, used by the email helper:

```env
RESEND_API_KEY="replace-with-resend-api-key"
SENDER_EMAIL="onboarding@resend.dev"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
```

### Set Up the Database

Generate the Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed sample data:

```bash
npx ts-node src/db/seed.ts
```

### Run Locally

```bash
npm run dev
```

Open http://localhost:3000.

## Available Scripts

```bash
npm run dev          # Start the local development server
npm run build        # Build the production app
npm run start        # Start the production server after build
npm run lint         # Run ESLint
npm test             # Run Jest tests
npm run test:watch   # Run Jest in watch mode
```

## Test Accounts

The seed file creates these local accounts:

```text
Admin:
Email: jaycee.wu@example.com
Password: SecurePassword@123

Customer:
Email: test.customer@example.com
Password: SecurePassword@123
```

Use these only for local development or demo databases.

## Deployment

The project is designed for deployment on Vercel.

Before deploying:

- Add all required environment variables in the Vercel project settings
- Use a hosted PostgreSQL database such as Neon
- Run production migrations with `npx prisma migrate deploy`
- Keep PayPal sandbox credentials for testing and switch to live credentials only when production payments are ready

Current deployed version:

- Live demo: https://moonlit-sichuan.vercel.app/

Related deployed version:

- Basic version without order functionality: https://restaurant-web-app-basic.vercel.app/
- Basic version repository: https://github.com/JayceeWU/Restaurant-Web-App-Basic

## Notes

- The current repository contains the order-enabled code path.
- The Basic repository is useful as a public restaurant website demo when online ordering is not needed.
- Local `.env` files contain secrets and should remain untracked.
