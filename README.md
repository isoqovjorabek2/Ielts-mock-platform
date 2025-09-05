# IELTS Mock Exam Platform

A comprehensive bilingual IELTS Mock Exam Platform built specifically for Uzbek students. This platform replicates the real exam environment with timed tests for all IELTS sections: Listening, Reading, Writing, and Speaking.

🌐 **Live Demo**: [View the deployed application](https://your-deployment-url.com)

## Features

### 🎯 Core Features (MVP)
- **Listening & Reading Mock Exams** with auto-grading and instant scores
- **Basic Writing & Speaking Modules** with AI-assisted feedback
- **Bilingual Interface** (English/Uzbek) with language toggle
- **User Authentication** and progress tracking
- **Analytics Dashboard** with performance breakdown
- **Freemium Model** (1 free test, then paid packages)

### 🌟 Key Highlights
- **Real Exam Environment**: Timed tests that replicate actual IELTS conditions
- **Local Payment Support**: Integration ready for Payme, Click, Paynet, UzCard/Humo
- **AI-Powered Feedback**: Grammar and structure hints for writing tasks
- **Progress Analytics**: Detailed breakdown of scores and weak areas
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite 6
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Supabase (Authentication, Database, Storage)
- **Internationalization**: react-i18next for bilingual support
- **State Management**: React hooks + Supabase client
- **Routing**: React Router DOM
- **Deployment**: Bolt Hosting

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ielts-mock-platform.git
   cd ielts-mock-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   
   Create the following tables in your Supabase database:

   ```sql
   -- Profiles table
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     email TEXT NOT NULL,
     full_name TEXT,
     preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'uz')),
     free_tests_used INTEGER DEFAULT 0,
     subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Exam results table
   CREATE TABLE exam_results (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES profiles(id) NOT NULL,
     exam_type TEXT NOT NULL CHECK (exam_type IN ('listening', 'reading', 'writing', 'speaking', 'full')),
     section_scores JSONB NOT NULL,
     overall_score DECIMAL(3,1) NOT NULL,
     time_taken INTEGER NOT NULL,
     completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     answers JSONB NOT NULL
   );

   -- Enable RLS
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;

   -- RLS Policies
   CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
   CREATE POLICY "Users can read own exam results" ON exam_results FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can insert own exam results" ON exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Footer, Layout components
│   ├── UI/             # Basic UI components (Timer, ProgressBar, etc.)
│   └── Exam/           # Exam-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── pages/              # Page components
│   └── Auth/           # Authentication pages
└── types/              # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Key Components

### Authentication System
- Email/password authentication via Supabase
- User profiles with language preferences
- Freemium model with test usage tracking

### Exam Interface
- Timer functionality with visual warnings
- Question navigation sidebar
- Progress tracking
- Auto-save functionality

### Analytics Dashboard
- Performance overview
- Section-wise score breakdown
- Progress tracking over time
- Weak area identification

## Internationalization

The platform supports English and Uzbek languages:
- All UI text is translatable
- Language preference is saved per user
- Easy to add more languages

## Database Schema

The application uses Supabase with the following main tables:
- `profiles` - User profile information
- `exam_results` - Test results and scores
- `prices` - Pricing information for premium features

## Payment Integration (Ready for Implementation)

The platform is structured to support local Uzbek payment methods:
- Payme
- Click
- Paynet
- UzCard/Humo

Payment integration points are prepared in the codebase for easy implementation.

## Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

The application is configured for deployment on Bolt Hosting. The build process:

1. Runs TypeScript compilation
2. Builds optimized production bundle with Vite
3. Deploys static assets to CDN

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Issues and Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/ielts-mock-platform/issues) page
2. Create a new issue with detailed description
3. Contact support at support@ieltsmock.uz

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Powered by [Supabase](https://supabase.com/) for backend services
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Deployed on [Bolt Hosting](https://bolt.new/)

---

**Built with ❤️ for Uzbek IELTS students**

⭐ If this project helped you, please give it a star on GitHub!