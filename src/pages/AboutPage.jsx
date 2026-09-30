import React from 'react';
import { 
  Info, 
  Terminal, 
  CheckCircle2, 
  Cpu, 
  GraduationCap, 
  Layers, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Badge } from '../components/Badge';

export const AboutPage = () => {
  return (
    <div>
      {/* Hero Welcome */}
      <div className="hero-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Badge variant="blue">College Lab & Faculty Demonstration</Badge>
          <Badge variant="purple">C++ / DSA Curriculum Companion</Badge>
        </div>
        <h2 className="hero-title">About Number System Toolkit</h2>
        <p className="hero-subtitle">
          An interactive, high-precision educational web application built specifically for Computer Science students and faculty
          to bridge the gap between classroom theory and real-world system architecture.
        </p>
      </div>

      {/* College Project Highlights */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <GraduationCap size={22} style={{ color: '#38bdf8' }} />
            <span>Why This Project Matters for DSA & C++</span>
          </div>
          <Badge variant="green">Academic Project</Badge>
        </div>

        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1rem' }}>
          In Computer Science curricula, Data Structures & Algorithms, and Computer Organization courses, students frequently struggle with:
        </p>

        <div className="edu-grid">
          <div className="feature-box">
            <div className="feature-box-title">1. Why Division by Radix Works</div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Students memorize formulas without seeing why successive divisions extract digits in reverse order (bottom-to-top) through the Division Algorithm theorem: <code>a = q × b + r</code>.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-box-title">2. Bit Grouping Tricks (2³ & 2⁴)</div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Understanding why binary converts into octal in 3-bit chunks and hexadecimal in 4-bit nibbles without converting through decimal first saves massive CPU cycles in systems software.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-box-title">3. Parity & Bitwise Optimization</div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Why checking <code>(n & 1)</code> in C++ is faster than <code>n % 2</code>, and how trial division up to <code>√n</code> guarantees prime testing correctness in O(√n) time.
            </p>
          </div>
        </div>
      </div>

      {/* Complete Feature Checklist */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <CheckCircle2 size={20} style={{ color: '#34d399' }} />
            <span>Core Features Implemented (14/14 Modules)</span>
          </div>
          <Badge variant="blue">100% Fully Functional</Badge>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
          {[
            '1. Decimal to Binary (division by 2, remainder readout)',
            '2. Binary to Decimal (positional 2ⁱ expansion, sum)',
            '3. Decimal to Octal (division by 8, remainder readout)',
            '4. Octal to Decimal (positional 8ⁱ expansion, sum)',
            '5. Decimal to Hexadecimal (division by 16, A–F explanation)',
            '6. Hexadecimal to Decimal (positional 16ⁱ expansion, sum)',
            '7. Binary to Octal (3-bit grouping from right, zero padding)',
            '8. Octal to Binary (3-bit conversion per digit)',
            '9. Binary to Hexadecimal (4-bit nibble grouping, A–F)',
            '10. Hexadecimal to Binary (4-bit conversion per digit)',
            '11. Educational Guide (Dec, Bin, Oct, Hex, Radix, Apps)',
            '12. Prime Number Checker (Trial division up to √n, factor analysis)',
            '13. Even / Odd Checker (Modulo n%2 & C++ bitwise n&1)',
            '14. Multi-Base Representation (Simultaneous 4-base cards & memory bits)'
          ].map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: '#131b2c', 
                border: '1px solid #23314d', 
                borderRadius: '8px', 
                padding: '0.75rem 1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.6rem',
                fontSize: '0.85rem',
                color: '#e2e8f0'
              }}
            >
              <CheckCircle2 size={16} style={{ color: '#34d399', flexShrink: 0 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack & Engineering Decisions */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Cpu size={20} style={{ color: '#38bdf8' }} />
            <span>Technical Architecture</span>
          </div>
          <Badge variant="purple">Modern Lightweight Stack</Badge>
        </div>

        <div className="edu-grid">
          <div className="feature-box">
            <div className="feature-box-title">Frontend Framework</div>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
              <strong>React 19 + Vite 8</strong> for lightning-fast HMR and seamless client-side execution with zero backend dependency.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-box-title">Arbitrary Precision Arithmetic</div>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
              Built with JavaScript native <code>BigInt</code> to eliminate standard IEEE-754 64-bit float precision limitations, safely handling numbers beyond 2⁵³ - 1.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-box-title">Pure Design System</div>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
              Custom CSS with CSS variables, glowing indicators, responsive grid cards, and mobile-friendly touch targets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
