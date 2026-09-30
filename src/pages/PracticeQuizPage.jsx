import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Sparkles 
} from 'lucide-react';
import { PRACTICE_QUESTIONS } from '../data/quizData';
import { Badge } from '../components/Badge';

export const PracticeQuizPage = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId, optionIndex) => {
    if (userAnswers[questionId] !== undefined) return; // prevent re-answering
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = PRACTICE_QUESTIONS.filter(
    q => userAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div>
      {/* Hero Welcome */}
      <div className="hero-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Badge variant="green">Interactive Assessment</Badge>
          <Badge variant="blue">Instant Grading & Solution Walkthroughs</Badge>
        </div>
        <h2 className="hero-title">Number Systems Practice Quiz</h2>
        <p className="hero-subtitle">
          Test your conceptual understanding of binary groupings, hexadecimal conversions, prime properties, and C++ bitwise tricks.
        </p>
      </div>

      {/* Quiz Progress & Score Card */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Progress: </span>
            <strong style={{ color: '#fff' }}>{answeredCount} of {PRACTICE_QUESTIONS.length} Answered</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {answeredCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontWeight: 700 }}>
                <Trophy size={18} />
                <span>Score: {correctCount} / {answeredCount}</span>
              </div>
            )}
            <button onClick={handleReset} className="btn btn-secondary">
              <RotateCcw size={15} />
              <span>Reset Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div>
        {PRACTICE_QUESTIONS.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={q.id} className="quiz-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#fff' }}>
                  <span style={{ color: '#60a5fa', marginRight: '0.5rem' }}>Q{idx + 1}.</span>
                  {q.question}
                </h3>
                {isAnswered && (
                  <Badge variant={isCorrect ? 'green' : 'rose'}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </Badge>
                )}
              </div>

              <div className="quiz-options-grid">
                {q.options.map((opt, optIdx) => {
                  let btnClass = '';
                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnClass = 'correct';
                    } else if (selected === optIdx) {
                      btnClass = 'incorrect';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`quiz-option-btn ${btnClass}`}
                    >
                      <span style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        background: 'rgba(255, 255, 255, 0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div 
                  style={{ 
                    marginTop: '1rem', 
                    padding: '0.75rem 1rem', 
                    background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                    borderLeft: `4px solid ${isCorrect ? '#10b981' : '#f43f5e'}`,
                    borderRadius: '0 8px 8px 0',
                    fontSize: '0.875rem',
                    color: '#cbd5e1'
                  }}
                >
                  <strong>Explanation: </strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
