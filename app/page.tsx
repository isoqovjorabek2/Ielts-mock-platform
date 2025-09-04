import React from 'react';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Welcome to the IELTS Mock Platform</h1>
        <p>Your one-stop solution for preparing for the IELTS exam with mock tests and expert resources.</p>
      </header>
      
      <section>
        <h2>Features</h2>
        <ul>
          <li>Comprehensive Practice Tests</li>
          <li>Detailed Performance Analytics</li>
          <li>Expert Tips and Resources</li>
        </ul>
      </section>
      
      <section>
        <h2>Ready to take the next step?</h2>
        <button onClick={() => alert('Redirecting to the test...')}>Start Your Test Now</button>
      </section>
    </div>
  );
};

export default HomePage;