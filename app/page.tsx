export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
      <div className="container-centered py-12">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Master IELTS with Real Mock Exams
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Practice IELTS online with authentic questions, instant results, and AI feedback.
            Tailored for students in Uzbekistan.
          </p>
          <div className="flex gap-4 justify-center">
            <a className="px-8 py-3 bg-brand text-white rounded-full shadow hover:bg-brand-light transition">Take Free Test</a>
            <a className="px-6 py-3 border rounded-full shadow">Sign Up</a>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl">
          <div className="p-6 border rounded-2xl shadow">
            <h3 className="font-semibold mb-2">⏱️ Real Exam Simulation</h3>
            <p>Timed tests that look and feel like the real IELTS exam.</p>
          </div>
          <div className="p-6 border rounded-2xl shadow">
            <h3 className="font-semibold mb-2">📊 Instant Results</h3>
            <p>Get auto-scored Listening & Reading sections with detailed analytics.</p>
          </div>
          <div className="p-6 border rounded-2xl shadow">
            <h3 className="font-semibold mb-2">✍️ AI Feedback</h3>
            <p>AI-assisted insights on Writing & Speaking to help you improve.</p>
          </div>
          <div className="p-6 border rounded-2xl shadow">
            <h3 className="font-semibold mb-2">💳 Local Payments</h3>
            <p>Pay with UZCARD, Humo, Click, or Payme easily.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
