# RevGen Rooms - Digital Sales Room Platform

A lightweight Digital Sales Room (DSR) platform that lets you send prospects a single link containing everything they need to buy: meeting recap, service overview, pricing, contract signing, and payment.

## 🚀 Features

- **Meeting Recap**: AI-powered summaries that capture key discussion points and next steps
- **Service Overview**: Customizable sections for your services, case studies, and testimonials
- **Pricing Display**: Beautiful pricing tables with multiple tiers
- **E-Signatures**: Built-in contract signing with legally binding digital signatures
- **Instant Payments**: Stripe integration for seamless checkout
- **Analytics**: Track views, engagement, and know when prospects are ready

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + Framer Motion
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL
- **Auth**: Clerk
- **Payments**: Stripe
- **AI**: OpenAI API (for meeting recap generation)

## 📁 Project Structure

```
revgen-sales-room/
├── app/
│   ├── (auth)/              # Auth pages (login, signup)
│   ├── (dashboard)/         # Protected dashboard pages
│   │   └── dashboard/
│   │       ├── rooms/       # Room management
│   │       ├── templates/   # Room templates
│   │       ├── analytics/   # Analytics dashboard
│   │       └── settings/    # User settings
│   ├── r/[slug]/            # Public room view
│   └── api/                 # API routes
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── dashboard/           # Dashboard components
│   └── room-viewer/         # Public room components
├── lib/                     # Utility functions
├── prisma/                  # Database schema
└── types/                   # TypeScript types
```

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk account (for auth)
- Stripe account (for payments)
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:
   ```bash
   cd revgen-sales-room
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

   Then fill in your environment variables:
   ```
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   STRIPE_SECRET_KEY=sk_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   OPENAI_API_KEY=sk-...
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Run the development server:
```bash
npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `OPENAI_API_KEY` | OpenAI API key |
| `NEXT_PUBLIC_APP_URL` | Your app URL |

## 🎨 Customization

### Styling

The app uses Tailwind CSS with a custom dark theme. Main colors and styles are defined in:
- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration

### Components

UI components are in `components/ui/` and follow a consistent design pattern. Key components:
- `Button` - Multiple variants (default, outline, ghost, etc.)
- `Card` - Card containers with header, content, footer
- `Input` / `Textarea` - Form inputs with labels and error states
- `Badge` - Status badges with color variants

## 📊 Database Schema

The main models are:
- **User**: Account information linked to Clerk
- **Room**: Sales rooms with prospect info, content, pricing
- **RoomView**: Analytics for tracking engagement
- **RoomTemplate**: Reusable room templates

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Railway
- Render
- AWS Amplify
- Self-hosted with Docker

## 📝 License

MIT License - feel free to use this for your own projects!

## 🙏 Credits

Built with ❤️ for RevGen Labs
