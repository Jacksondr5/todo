# J5 Todo

A task management application built with Next.js, Convex, and Clerk authentication.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Database:** Convex (real-time backend)
- **Authentication:** Clerk
- **Styling:** Tailwind CSS 4
- **Error Tracking:** Sentry

## Getting Started

### Prerequisites

- Node.js (see `.nvmrc` for version)
- pnpm

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the required values:

- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `SENTRY_DSN` - Sentry DSN for error tracking

### Development

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking

## License

Private
