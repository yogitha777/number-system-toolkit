import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  RotateCcw, 
  Cpu, 
  Binary, 
  CheckCircle, 
  XCircle, 
  Info,
  Check
} from 'lucide-react';
import { checkPrime, checkEvenOdd } from '../utils/operations';
import { validateInput } from '../utils/validators';
import { Badge } from '../components/Badge';

export const NumberOperationsPage = () => {
  const [activeSubTab, setActiveSubTab] = useState('prime'); // 'prime' | 'evenodd'

  // State for Prime Checker
  const [primeInput, setPrimeInput] = useState('29');
  const [primeResult, setPrimeResult] = useState(() => checkPrime('29'));
  const [primeError, setPrimeError] = useState('');

  // State for Even/Odd Checker
  const [evenOddInput, setEvenOddInput] = useState('42');
  const [evenOddResult, setEvenOddResult] = useState(() => checkEvenOdd('42'));
  const [evenOddError, setEvenOddError] = useState('');

  // Handlers for Prime
  const handleCheckPrime = (val = primeInput) => {
    const valCheck = validateInput(val, 'integer');
    if (!valCheck.isValid) {
      setPrimeError(valCheck.error);
      setPrimeResult(null);
      return;
    }
    setPrimeError('');
    const res = checkPrime(valCheck.cleanValue);
    setPrimeResult(res);
  };

  const handlePrimeInputChange = (e) => {
    const val = e.target.value;
    setPrimeInput(val);
    const valCheck = validateInput(val, 'integer');
    if (!valCheck.isValid) {
      setPrimeError(valCheck.error);
      setPrimeResult(null);
    } else {
      setPrimeError('');
      setPrimeResult(checkPrime(valCheck.cleanValue));
    }
  };

  // Handlers for Even/Odd
  const handleCheckEvenOdd = (val = evenOddInput) => {
    const valCheck = validateInput(val, 'integer');
    if (!valCheck.isValid) {
      setEvenOddError(valCheck.error);
      setEvenOddResult(null);
      return;
    }
    setEvenOddError('');
    const res = checkEvenOdd(valCheck.cleanValue);
    setEvenOddResult(res);
  };

  const handleEvenOddInputChange = (e) => {
    const val = e.target.value;
    setEvenOddInput(val);
    const valCheck = validateInput(val, 'integer');
    if (!valCheck.isValid) {
      setEvenOddError(valCheck.error);
      setEvenOddResult(null);
    } else {
      setEvenOddError('');
      setEvenOddResult(checkEvenOdd(valCheck.cleanValue));
    }
  };

  const primePresets = ['0', '1', '2', '7', '13', '27', '29', '97', '121', '1023', '104729'];
  const evenOddPresets = ['0', '1', '2', '14', '25', '42', '101', '256', '-5', '-12'];

  return (
    <div>
      {/* Subtab Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveSubTab('prime')}
          className={`btn ${activeSubTab === 'prime' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, padding: '0.85rem' }}
        >
          <ShieldCheck size={18} />
          <span>Prime Number Checker</span>
        </button>
        <button
          onClick={() => setActiveSubTab('evenodd')}
          className={`btn ${activeSubTab === 'evenodd' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, padding: '0.85rem' }}
        >
          <Cpu size={18} />
          <span>Even / Odd (Parity & Modulo)</span>
        </button>
      </div>

      {/* PRIME NUMBER CHECKER */}
      {activeSubTab === 'prime' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <ShieldCheck size={22} style={{ color: '#38bdf8' }} />
              <span>Prime Number Checker</span>
              <Badge variant="blue">O(√n) Trial Division</Badge>
            </div>
            <button
              onClick={() => {
                setPrimeInput('');
                setPrimeError('');
                setPrimeResult(null);
              }}
              className="btn btn-clear"
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          </div>

          <div className="input-group">
            <div className="input-label">
              <span>Enter an Integer (n):</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Test any whole number (e.g. 2, 7, 29, 97)
              </span>
            </div>

            <div className="input-container">
              <input
                type="text"
                className={`text-input ${primeError ? 'error' : ''}`}
                value={primeInput}
                onChange={handlePrimeInputChange}
                placeholder="Enter an integer..."
              />
              <button className="btn btn-primary" onClick={() => handleCheckPrime()}>
                Check Prime
              </button>
            </div>

            {primeError && (
              <div className="error-message">
                <Info size={16} />
                <span>{primeError}</span>
              </div>
            )}

            <div className="presets-bar">
              <span className="presets-label">Test Numbers:</span>
              {primePresets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="preset-chip"
                  onClick={() => {
                    setPrimeInput(p);
                    handleCheckPrime(p);
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Prime Result Display */}
          {primeResult && (
            <div style={{ marginTop: '1.5rem' }}>
              <div className={`status-badge-lg ${primeResult.statusClass}`}>
                {primeResult.isPrime ? <CheckCircle size={22} /> : <XCircle size={22} />}
                <span>{primeResult.title}</span>
              </div>

              <div className="step-explanation-box">
                <strong>Analysis: </strong>
                {primeResult.summary}
              </div>

              {/* Algorithm logic and Divisor testing */}
              <div className="steps-container" style={{ marginTop: '1rem' }}>
                <div className="step-section-title">
                  <Cpu size={18} style={{ color: 'var(--accent-primary)' }} />
                  <span>Mathematical Proof & Factor Testing Logic</span>
                </div>

                <div style={{ background: '#111827', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #1f2937' }}>
                  <p style={{ color: '#93c5fd', fontSize: '0.875rem' }}>
                    <strong>Why check only up to ⌊√n⌋?</strong> If an integer <code>n</code> is composite, it can be factored as <code>n = a × b</code>. 
                    If both factors were greater than <code>√n</code>, then <code>a × b &gt; √n × √n = n</code>, which is impossible. 
                    Hence, at least one factor must be less than or equal to <code>√n</code>.
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.825rem', marginTop: '0.4rem' }}>
                    {primeResult.algorithmNote}
                  </p>
                </div>

                {primeResult.steps && primeResult.steps.length > 0 && (
                  <div className="math-table-container">
                    <table className="math-table">
                      <thead>
                        <tr>
                          <th>Test Case / Divisor</th>
                          <th>Outcome</th>
                          <th>Explanation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {primeResult.steps.map((st, idx) => (
                          <tr key={idx}>
                            <td><code>{st.test}</code></td>
                            <td style={{ color: st.result.includes('Divisible') ? '#fb7185' : '#34d399', fontWeight: 600 }}>
                              {st.result}
                            </td>
                            <td style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                              {st.explanation}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* EVEN / ODD CHECKER */}
      {activeSubTab === 'evenodd' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Cpu size={22} style={{ color: '#38bdf8' }} />
              <span>Even / Odd Checker (Modulo & Parity)</span>
              <Badge variant="purple">Modulo Arithmetic & C++ Bitwise</Badge>
            </div>
            <button
              onClick={() => {
                setEvenOddInput('');
                setEvenOddError('');
                setEvenOddResult(null);
              }}
              className="btn btn-clear"
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          </div>

          <div className="input-group">
            <div className="input-label">
              <span>Enter an Integer:</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Accepts 0, positive, or negative integers
              </span>
            </div>

            <div className="input-container">
              <input
                type="text"
                className={`text-input ${evenOddError ? 'error' : ''}`}
                value={evenOddInput}
                onChange={handleEvenOddInputChange}
                placeholder="Enter an integer..."
              />
              <button className="btn btn-primary" onClick={() => handleCheckEvenOdd()}>
                Check Even/Odd
              </button>
            </div>

            {evenOddError && (
              <div className="error-message">
                <Info size={16} />
                <span>{evenOddError}</span>
              </div>
            )}

            <div className="presets-bar">
              <span className="presets-label">Test Samples:</span>
              {evenOddPresets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="preset-chip"
                  onClick={() => {
                    setEvenOddInput(p);
                    handleCheckEvenOdd(p);
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Even/Odd Result Display */}
          {evenOddResult && (
            <div style={{ marginTop: '1.5rem' }}>
              <div className={`status-badge-lg ${evenOddResult.statusClass}`}>
                {evenOddResult.isEven ? <CheckCircle size={22} /> : <Info size={22} />}
                <span>{evenOddResult.title}</span>
              </div>

              {/* Binary LSB Card */}
              <div 
                style={{ 
                  background: 'var(--bg-input)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '12px', 
                  padding: '1.25rem',
                  marginBottom: '1.25rem' 
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Binary Least Significant Bit (LSB) Analysis:
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <span style={{ color: '#cbd5e1' }}>
                      {evenOddResult.binary.slice(0, -1) || '0'}
                    </span>
                    <span 
                      style={{ 
                        background: evenOddResult.isEven ? 'rgba(6, 182, 212, 0.25)' : 'rgba(168, 85, 247, 0.25)', 
                        color: evenOddResult.isEven ? '#38bdf8' : '#c084fc',
                        border: `1px solid ${evenOddResult.isEven ? '#06b6d4' : '#a855f7'}`,
                        borderRadius: '4px',
                        padding: '0 6px',
                        fontWeight: 800
                      }}
                      title="Least Significant Bit (LSB)"
                    >
                      {evenOddResult.lsb}
                    </span>
                    <sub style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: '3px' }}>2</sub>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: '#93c5fd' }}>
                    ➔ LSB is <strong>'{evenOddResult.lsb}'</strong>: In base 2, all powers 2¹, 2², 2³... are even numbers. Only 2⁰ (the last bit) can add an odd value (1)!
                  </div>
                </div>
              </div>

              {/* 3 Step Evaluation Comparison */}
              <div className="steps-container">
                <div className="step-section-title">
                  <Binary size={18} style={{ color: 'var(--accent-primary)' }} />
                  <span>Modulo Operation & Parity Formulations</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.75rem' }}>
                  {evenOddResult.steps.map((st, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        background: '#111827', 
                        padding: '1rem', 
                        borderRadius: '8px', 
                        border: '1px solid #1f2937' 
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.9rem' }}>
                          {st.method}
                        </span>
                        <Badge variant={evenOddResult.isEven ? 'cyan' : 'purple'}>
                          {st.result}
                        </Badge>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', color: '#fff', fontSize: '0.95rem', margin: '0.25rem 0' }}>
                        <code>{st.formula}</code>
                      </div>
                      <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                        {st.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
