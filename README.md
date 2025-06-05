# Dokuritsu Simulator
![CI](https://github.com/your/repo/actions/workflows/ci.yml/badge.svg)

Dokuritsu Simulator helps Japan-based professionals visualize and prepare for self-employment. It calculates tasks, costs and cash flow on your road to independence.

## Overview

This project aims to provide an SPA dashboard with the following main features:

1. **Pre-Launch Adviser** – a multi-step diagnosis form that auto-generates tasks, schedules and cost estimates.
2. **Cash-Flow Dashboard** – manage incomes and expenses, forecast future cash flow and send alerts.
3. **Deductible Checker** – rule-based judgement for expense deductibility based on Japanese tax guidelines.

All interfaces are optimized for mobile, offer dark mode and are fully translated in Japanese from day one.

## Tech Stack

- **Frontend**: Next.js 19 with App Router and Server Actions, TailwindCSS and Recharts. Uses NextAuth for authentication.
- **Backend**: NestJS (TypeScript) with Prisma ORM.
- **Database**: PostgreSQL (SQLite for local development).
- **CI/CD**: GitHub Actions running lint, type checks, tests and Docker builds.
- **Testing**: Vitest for unit tests and Playwright for E2E tests.

## Domain Model

```
User      1 -- n Diagnosis
User      1 -- n Income
User      1 -- n Expense
User      1 -- 1 Setting
```

Key tables include `users`, `diagnoses`, `incomes`, `expenses` and `settings`.

## Main Features

### Pre-Launch Adviser

A 5–7 page step form collects information such as employment history, savings and desired base of operations. It automatically proposes a timeline of tasks like tax office filings and estimates national health insurance, pension and other costs.

### Cash-Flow Dashboard

Displays revenue, expenses and profit for the current month, quarter and year with charts. Users can manually enter income/expenses or import CSV data. Simple forecasting (e.g., moving averages) predicts 3–6 months ahead.

### Deductible Checker

A yes/no mini tool followed by detailed guides to judge if an expense is deductible. Rules are managed in `expense_rules.json` and link back to official documentation.

## Development

The project is intended as a monorepo managed by `pnpm` with the following structure:

```
apps/
  frontend/
  backend/
packages/
  shared/
```

Run `turbo run build` to build all packages. Environment variables are documented in `.env.example` and should be managed via Doppler or GitHub Secrets.

Copy `.env.example` to `.env` and provide values for the variables before running the apps.

After cloning, run `pnpm prepare` to install git hooks. Pre-commit hooks rely on Husky with lint-staged and automatically run `pnpm lint` and `pnpm format`.

### Environment Variables

- `DATABASE_URL` – database connection string
- `EMAIL_SERVER` – SMTP server connection string for auth emails
- `EMAIL_FROM` – default from address for auth emails
- `GOOGLE_CLIENT_ID` – Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` – Google OAuth client secret
- `SENTRY_DSN` – Sentry project DSN
- `API_BASE_URL` – base URL for the backend API in production

## Milestones

1. **Monorepo scaffold & authentication**
2. **Diagnosis form and result page**
3. **Income/Expense CRUD with charts**
4. **Refine dashboard with deductible rules**

## Inspiration

The original README briefly stated:

```
# dokuritsu-simulator
独立への第一歩を踏み出すあなたに、収入・税金・経費を一括試算。豊かな独立生活は夢か現実か。
```

This repository expands on that concept with a full-stack implementation plan to help aspiring freelancers understand the financial realities of going solo.

