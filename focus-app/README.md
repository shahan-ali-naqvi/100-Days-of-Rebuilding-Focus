# Focus - 100 Days of Rebuilding Focus

A productivity app designed to help you build better habits and achieve your goals through a structured 100-day journey.

## 🎯 About

This app is part of the "100 Days of Rebuilding Focus" project - a personal mission to break free from distractions and build productive habits. The app serves as an AI-powered coach to help users:

- Set and track meaningful goals
- Build consistent daily habits
- Measure commitments and deadlines
- Handle miscommitment scenarios with time flexibility
- Apply habit-building lessons from books like Atomic Habits
- Receive AI coaching to refine habits weekly

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Jotai
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (protected)/        # Protected routes requiring auth
│   │   └── dashboard/       # Main dashboard
│   ├── auth/               # Authentication pages
│   │   └── login/          # Login page
│   └── api/                # API routes
│       └── auth/           # NextAuth endpoints
├── components/             # Reusable components
│   ├── ui/                 # Base UI components
│   └── partials/           # Layout components
│       ├── header/         # App header
│       └── sidebar/        # Navigation sidebar
├── lib/                    # Utilities and config
│   ├── auth.ts            # NextAuth configuration
│   └── utils.ts           # Utility functions
└── providers/              # React context providers
```

## 🛠️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and update with your values:
   ```bash
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the app**:
   Visit [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: demo@focusapp.com
- **Password**: demo123

## 🎨 Design System

The app uses a productivity-focused color palette with:
- **Primary**: Blue (#3B82F6) - Focus and trust
- **Secondary**: Gray tones - Clean and minimal
- **Success**: Green - Achievement and progress
- **Dark Mode**: Full support with CSS variables

## 📱 Features (Current)

- ✅ User authentication
- ✅ Protected dashboard layout
- ✅ Responsive design (mobile-first)
- ✅ Dark/light theme support
- ✅ Clean navigation structure
- ✅ Progress tracking visualization

## 🚧 Upcoming Features

- 🎯 Goal setting and tracking
- 📋 Habit management system
- 📊 Progress analytics
- 🤖 AI coaching integration
- 📅 Calendar integration
- ⏱️ Focus session timer
- 📈 Weekly/monthly reports

## 🔧 Development

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Dev**: `npm run dev`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

This is part of a personal 100-day challenge, but contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share ideas for improvement

---

**Day 1 of 100** - The journey begins! 🚀
