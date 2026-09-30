import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ConversionsPage } from './pages/ConversionsPage';
import { NumberOperationsPage } from './pages/NumberOperationsPage';
import { RepresentationPage } from './pages/RepresentationPage';
import { LearnPage } from './pages/LearnPage';
import { PracticeQuizPage } from './pages/PracticeQuizPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const [activeTab, setActiveTab] = useState('conversions');

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="content-wrapper">
        {activeTab === 'conversions' && <ConversionsPage />}
        {activeTab === 'operations' && <NumberOperationsPage />}
        {activeTab === 'representations' && <RepresentationPage />}
        {activeTab === 'learn' && <LearnPage />}
        {activeTab === 'quiz' && <PracticeQuizPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <footer className="footer-bar">
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong>Number System Toolkit</strong> — Educational Computer Science & DSA Project
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem' }}>
            <span style={{ cursor: 'pointer', color: '#93c5fd' }} onClick={() => setActiveTab('conversions')}>Conversions</span>
            <span style={{ cursor: 'pointer', color: '#93c5fd' }} onClick={() => setActiveTab('operations')}>Operations</span>
            <span style={{ cursor: 'pointer', color: '#93c5fd' }} onClick={() => setActiveTab('representations')}>Multi-Base</span>
            <span style={{ cursor: 'pointer', color: '#93c5fd' }} onClick={() => setActiveTab('learn')}>Learn</span>
            <span style={{ cursor: 'pointer', color: '#93c5fd' }} onClick={() => setActiveTab('quiz')}>Quiz</span>
            <span style={{ cursor: 'pointer', color: '#93c5fd' }} onClick={() => setActiveTab('about')}>About</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
