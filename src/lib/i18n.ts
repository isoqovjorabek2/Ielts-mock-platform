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
      freeTrialEnded: 'Your free trial has ended',
      upgradeToAccess: 'Upgrade to access unlimited mock exams',
      
      // Instructions
      listeningInstructions: 'You will hear a recording. Answer the questions as you listen.',
      readingInstructions: 'Read the passage and answer the questions that follow.',
      writingInstructions: 'Write your essay response. You have 60 minutes to complete this task.',
      speakingInstructions: 'Record your response to the speaking prompt. Speak clearly and naturally.',
      
      // Internal linking and navigation
      mockExams: 'Mock Exams',
      test: 'Test',
      testResults: 'Test Results',
      bookExam: 'Book Exam',
      nextSteps: 'What\'s Next?',
      startPracticing: 'Start Practicing',
      takeYourFirstMockExam: 'Take your first IELTS mock exam',
      bookLocalExam: 'Book Local Exam',
      experienceRealExamConditions: 'Experience real exam conditions',
      viewProgress: 'View Progress',
      trackYourImprovement: 'Track your improvement over time',
      bookSupervisedExam: 'Book Supervised Exam',
      getExpertFeedback: 'Get expert feedback and guidance',
      practiceMore: 'Practice More',
      improveYourWeakAreas: 'Improve your weak areas',
      viewAllResults: 'View All Results',
      trackProgressOverTime: 'Track your progress over time',
      takeNewTest: 'Take New Test',
      continueImproving: 'Continue improving your skills',
      upgradeToSupervised: 'Upgrade to Supervised',
      getPersonalizedFeedback: 'Get personalized feedback',
      practiceTests: 'Practice Tests',
      improveYourSkills: 'Improve your IELTS skills',
      trackProgress: 'Track Progress',
      seeYourImprovement: 'See your improvement',
      quickAccess: 'Quick Access',
      listeningTest: 'Listening Test',
      readingTest: 'Reading Test',
      writingTest: 'Writing Test',
      speakingTest: 'Speaking Test',
      studyTips: 'Study Tips',
      practiceRegularly: 'Practice regularly for best results',
      timeYourself: 'Time yourself during practice',
      reviewMistakes: 'Review your mistakes carefully',
      focusOnWeakAreas: 'Focus on your weak areas',
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
      bookExamPayment: 'Imtihon buyurtma qilish',
      freeTrialEnded: 'Bepul sinov muddati tugadi',
      upgradeToAccess: 'Cheksiz sinov imtihonlariga kirish uchun yangilang',
      
      // Instructions
      listeningInstructions: 'Siz yozuvni eshitasiz. Tinglaganingizda savollarga javob bering.',
      readingInstructions: "Matnni o'qing va keyingi savollarga javob bering.",
      writingInstructions: 'Insho javobingizni yozing. Bu vazifani bajarish uchun 60 daqiqa vaqtingiz bor.',
      speakingInstructions: 'Gapirish taklifiga javobingizni yozib oling. Aniq va tabiiy gapiring.',
      
      // Internal linking and navigation
      mockExams: 'Sinov Imtihonlari',
      test: 'Test',
      testResults: 'Test Natijalari',
      bookExam: 'Imtihon Buyurtma Qilish',
      nextSteps: 'Keyingi Qadamlar',
      startPracticing: 'Mashq Qilishni Boshlash',
      takeYourFirstMockExam: 'Birinchi IELTS sinov imtihonini topshiring',
      bookLocalExam: 'Mahalliy Imtihon Buyurtma Qilish',
      experienceRealExamConditions: 'Haqiqiy imtihon sharoitlarini his qiling',
      viewProgress: 'Taraqqiyotni Ko\'rish',
      trackYourImprovement: 'Taraqqiyotingizni kuzatib boring',
      bookSupervisedExam: 'Nazorat Ostidagi Imtihon',
      getExpertFeedback: 'Mutaxassis fikr-mulohazasini oling',
      practiceMore: 'Ko\'proq Mashq Qiling',
      improveYourWeakAreas: 'Zaif tomonlaringizni yaxshilang',
      viewAllResults: 'Barcha Natijalarni Ko\'rish',
      trackProgressOverTime: 'Vaqt davomida taraqqiyotni kuzating',
      takeNewTest: 'Yangi Test Topshiring',
      continueImproving: 'Malakangizni oshirishda davom eting',
      upgradeToSupervised: 'Nazorat Ostidagiga O\'tish',
      getPersonalizedFeedback: 'Shaxsiy fikr-mulohaza oling',
      practiceTests: 'Mashq Testlari',
      improveYourSkills: 'IELTS malakalaringizni oshiring',
      trackProgress: 'Taraqqiyotni Kuzatish',
      seeYourImprovement: 'Taraqqiyotingizni ko\'ring',
      quickAccess: 'Tezkor Kirish',
      listeningTest: 'Tinglash Testi',
      readingTest: 'O\'qish Testi',
      writingTest: 'Yozish Testi',
      speakingTest: 'Gapirish Testi',
      studyTips: 'O\'qish Maslahatlari',
      practiceRegularly: 'Eng yaxshi natija uchun muntazam mashq qiling',
      timeYourself: 'Mashq paytida vaqtni o\'lchang',
      reviewMistakes: 'Xatolaringizni diqqat bilan ko\'rib chiqing',
      focusOnWeakAreas: 'Zaif tomonlaringizga e\'tibor bering',
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