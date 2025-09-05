import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      exams: 'Mock Exams',
      dashboard: 'Dashboard',
      profile: 'Profile',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      
      // Common
      start: 'Start',
      continue: 'Continue',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      
      // Home page
      welcomeTitle: 'Master IELTS with Confidence',
      welcomeSubtitle: 'Practice with realistic mock exams designed specifically for Uzbek students',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      
      // Exam types
      listening: 'Listening',
      reading: 'Reading',
      writing: 'Writing',
      speaking: 'Speaking',
      fullTest: 'Full Test',
      
      // Exam interface
      timeRemaining: 'Time Remaining',
      question: 'Question',
      of: 'of',
      nextQuestion: 'Next Question',
      previousQuestion: 'Previous Question',
      finishExam: 'Finish Exam',
      
      // Results
      yourScore: 'Your Score',
      overallScore: 'Overall Score',
      sectionBreakdown: 'Section Breakdown',
      weakAreas: 'Areas for Improvement',
      strengths: 'Your Strengths',
      
      // Auth
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      confirmPassword: 'Confirm Password',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      
      // Dashboard
      recentTests: 'Recent Tests',
      progressOverview: 'Progress Overview',
      freeTestsRemaining: 'Free Tests Remaining',
      upgradeAccount: 'Upgrade Account',
      
      // Payment
      choosePlan: 'Choose Your Plan',
      bookExam: 'Book Exam',
      freeTrialEnded: 'Your free trial has ended',
      upgradeToAccess: 'Upgrade to access unlimited mock exams',
      
      // Instructions
      listeningInstructions: 'You will hear a recording. Answer the questions as you listen.',
      readingInstructions: 'Read the passage and answer the questions that follow.',
      writingInstructions: 'Write your essay response. You have 60 minutes to complete this task.',
      speakingInstructions: 'Record your response to the speaking prompt. Speak clearly and naturally.',
    }
  },
  uz: {
    translation: {
      // Navigation
      home: 'Bosh sahifa',
      exams: 'Sinov imtihonlari',
      dashboard: 'Boshqaruv paneli',
      profile: 'Profil',
      login: 'Kirish',
      register: "Ro'yxatdan o'tish",
      logout: 'Chiqish',
      
      // Common
      start: 'Boshlash',
      continue: 'Davom etish',
      submit: 'Yuborish',
      cancel: 'Bekor qilish',
      save: 'Saqlash',
      loading: 'Yuklanmoqda...',
      error: 'Xatolik',
      success: 'Muvaffaqiyat',
      
      // Home page
      welcomeTitle: 'IELTS ni ishonch bilan egallang',
      welcomeSubtitle: "O'zbek talabalar uchun maxsus ishlab chiqilgan real sinov imtihonlari bilan mashq qiling",
      getStarted: 'Boshlash',
      learnMore: "Ko'proq o'rganish",
      
      // Exam types
      listening: 'Tinglash',
      reading: "O'qish",
      writing: 'Yozish',
      speaking: 'Gapirish',
      fullTest: "To'liq test",
      
      // Exam interface
      timeRemaining: 'Qolgan vaqt',
      question: 'Savol',
      of: 'dan',
      nextQuestion: 'Keyingi savol',
      previousQuestion: 'Oldingi savol',
      finishExam: 'Imtihonni tugatish',
      
      // Results
      yourScore: 'Sizning natijangiz',
      overallScore: 'Umumiy ball',
      sectionBreakdown: "Bo'limlar bo'yicha natija",
      weakAreas: "Yaxshilanishi kerak bo'lgan sohalar",
      strengths: 'Sizning kuchli tomonlaringiz',
      
      // Auth
      email: 'Elektron pochta',
      password: 'Parol',
      fullName: "To'liq ism",
      confirmPassword: 'Parolni tasdiqlang',
      signIn: 'Kirish',
      signUp: "Ro'yxatdan o'tish",
      dontHaveAccount: "Hisobingiz yo'qmi?",
      alreadyHaveAccount: 'Hisobingiz bormi?',
      
      // Dashboard
      recentTests: 'Oxirgi testlar',
      progressOverview: "Taraqqiyot ko'rinishi",
      freeTestsRemaining: 'Qolgan bepul testlar',
      upgradeAccount: 'Hisobni yangilash',
      
      // Payment
      choosePlan: 'Rejangizni tanlang',
      bookExam: 'Imtihon buyurtma qilish',
      freeTrialEnded: 'Bepul sinov muddati tugadi',
      upgradeToAccess: 'Cheksiz sinov imtihonlariga kirish uchun yangilang',
      
      // Instructions
      listeningInstructions: 'Siz yozuvni eshitasiz. Tinglaganingizda savollarga javob bering.',
      readingInstructions: "Matnni o'qing va keyingi savollarga javob bering.",
      writingInstructions: 'Insho javobingizni yozing. Bu vazifani bajarish uchun 60 daqiqa vaqtingiz bor.',
      speakingInstructions: 'Gapirish taklifiga javobingizni yozib oling. Aniq va tabiiy gapiring.',
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n