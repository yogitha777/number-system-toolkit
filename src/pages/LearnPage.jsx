import React, { useState } from 'react';
import { 
  BookOpen, 
  Binary, 
  Cpu, 
  Terminal, 
  Lightbulb, 
  Layers, 
  Check, 
  Copy,
  Table
} from 'lucide-react';
import { 
  NUMBER_SYSTEMS_INFO, 
  RADIX_COMPARISON_TABLE, 
  CPP_DSA_INSIGHTS 
} from '../data/numberSystemInfo';
import { Badge } from '../components/Badge';

export const LearnPage = () => {
  const [activeSystemId, setActiveSystemId] = useState('decimal');
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  const selectedSystem = NUMBER_SYSTEMS_INFO.find(s => s.id === activeSystemId) || NUMBER_SYSTEMS_INFO[0];

  const handleCopyCode = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  return (
    <div>
      {/* Hero Welcome */}
      <div className="hero-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Badge variant="blue">Educational Textbook</Badge>
          <Badge variant="purple">C++ & DSA Foundations</Badge>
        </div>
        <h2 className="hero-title">Understanding Number Systems & Computer Architecture</h2>
        <p className="hero-subtitle">
          Explore the history, mathematical foundation, positional radix notations, and hardware applications of
          the four fundamental number systems used across software engineering and data structures.
        </p>
      </div>

      {/* Core Concept: Radix / Base Explanation */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Lightbulb size={22} style={{ color: '#fbbf24' }} />
            <span>The Concept of Base (Radix) & Positional Value</span>
          </div>
          <Badge variant="amber">Universal Mathematical Law</Badge>
        </div>

        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1rem' }}>
          The <strong>radix</strong> (or <strong>base</strong>) of a number system specifies the total number of unique symbols or digits (including 0) available to represent quantities. 
          In a positional number system with base <em>b</em>, the value of any number <em>N</em> is expressed as the sum of each digit multiplied by its positional weight (powers of the base):
        </p>

        <div className="formula-banner" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '1.25rem', color: '#60a5fa', fontWeight: 700 }}>
            N = dₙ·bⁿ + dₙ₋₁·bⁿ⁻¹ + ... + d₂·b² + d₁·b¹ + d₀·b⁰
          </div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>
            Where <code>b</code> = radix (base), <code>dᵢ</code> = digit at position i (0 ≤ dᵢ &lt; b), and <code>i</code> = position from right (starting at 0).
          </div>
        </div>
      </div>

      {/* Interactive Tabs for 4 Systems */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <BookOpen size={20} style={{ color: '#38bdf8' }} />
            <span>In-Depth Number System Guides</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {NUMBER_SYSTEMS_INFO.map((sys) => {
            const isActive = sys.id === activeSystemId;
            return (
              <button
                key={sys.id}
                onClick={() => setActiveSystemId(sys.id)}
                className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: '1 1 200px' }}
              >
                <span>{sys.name}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>({sys.radix})</span>
              </button>
            );
          })}
        </div>

        {/* Selected System Details */}
        <div style={{ background: '#0e1626', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>{selectedSystem.name}</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Badge variant="blue">Radix: {selectedSystem.base}</Badge>
              <Badge variant="purple">{selectedSystem.symbolCount} Unique Symbols</Badge>
            </div>
          </div>

          <div className="edu-grid">
            <div className="feature-box">
              <div className="feature-box-title">Allowed Digits & Symbols</div>
              <code style={{ fontSize: '1rem', color: '#38bdf8' }}>{selectedSystem.digits}</code>
            </div>

            <div className="feature-box">
              <div className="feature-box-title">Notation & Prefix</div>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{selectedSystem.prefixNotation}</p>
            </div>

            <div className="feature-box">
              <div className="feature-box-title">C++ Programming Literal</div>
              <code style={{ fontSize: '0.85rem', color: '#34d399' }}>{selectedSystem.cppLiteral}</code>
            </div>
          </div>

          <div style={{ margin: '1.25rem 0' }}>
            <h4 style={{ color: '#93c5fd', fontSize: '0.95rem', marginBottom: '0.35rem' }}>Origin & History:</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{selectedSystem.history}</p>
          </div>

          <div style={{ margin: '1.25rem 0' }}>
            <h4 style={{ color: '#93c5fd', fontSize: '0.95rem', marginBottom: '0.35rem' }}>How It Works:</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{selectedSystem.howItWorks}</p>
            <div className="formula-banner" style={{ marginTop: '0.5rem' }}>
              <code>{selectedSystem.formula}</code>
            </div>
          </div>

          <div style={{ margin: '1.25rem 0' }}>
            <h4 style={{ color: '#93c5fd', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Real-World & Computer Applications:</h4>
            <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {selectedSystem.applications.map((app, aIdx) => (
                <li key={aIdx}>{app}</li>
              ))}
            </ul>
          </div>

          <div className="step-explanation-box" style={{ marginBottom: 0 }}>
            <strong>Computer Science & DSA Connection: </strong>
            {selectedSystem.csConnection}
          </div>
        </div>
      </div>

      {/* Side-by-Side Equivalence Table (0 to 16) */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Table size={20} style={{ color: '#38bdf8' }} />
            <span>Radix Equivalence Table (Values 0 to 16)</span>
          </div>
          <Badge variant="cyan">Reference Chart</Badge>
        </div>

        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1rem' }}>
          This quick reference table compares identical integer quantities represented across Decimal, 4-bit Binary, Octal, and Hexadecimal:
        </p>

        <div className="math-table-container">
          <table className="math-table">
            <thead>
              <tr>
                <th>Decimal (Base 10)</th>
                <th>Binary (Base 2)</th>
                <th>Octal (Base 8)</th>
                <th>Hexadecimal (Base 16)</th>
              </tr>
            </thead>
            <tbody>
              {RADIX_COMPARISON_TABLE.map((row) => (
                <tr key={row.dec}>
                  <td><strong style={{ color: '#60a5fa' }}>{row.dec}</strong></td>
                  <td><code style={{ color: '#34d399' }}>{row.bin}</code></td>
                  <td><span style={{ color: '#fbbf24' }}>{row.oct}</span></td>
                  <td><strong style={{ color: '#c084fc' }}>{row.hex}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* C++ & DSA Bitwise Operations Section */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Terminal size={20} style={{ color: '#38bdf8' }} />
            <span>C++ & DSA Practical Implementation Insights</span>
          </div>
          <Badge variant="purple">For College Viva & Lab Exams</Badge>
        </div>

        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Faculty frequently ask how number systems connect to actual C++ coding and competitive programming / DSA problems. 
          Study these key code snippets below:
        </p>

        {CPP_DSA_INSIGHTS.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>
              {idx + 1}. {item.title}
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              {item.description}
            </p>

            <div className="code-window">
              <div className="code-header">
                <span>C++ Source Code</span>
                <button
                  className="copy-btn"
                  onClick={() => handleCopyCode(item.code, idx)}
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                >
                  {copiedCodeIdx === idx ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedCodeIdx === idx ? 'Copied' : 'Copy C++'}</span>
                </button>
              </div>
              <pre className="code-body">
                {item.code}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
