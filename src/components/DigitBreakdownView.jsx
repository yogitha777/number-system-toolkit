import React from 'react';
import { ArrowDown } from 'lucide-react';

export const DigitBreakdownView = ({ steps, groupSize, finalOutput, fullPaddedOutput }) => {
  return (
    <div className="digit-breakdown-visualizer">
      <div className="groups-container">
        {steps.map((step, idx) => (
          <div key={idx} className="bit-group-box">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              Digit #{idx + 1}
            </span>

            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>
              {step.digit || step.char}
            </div>

            {step.isLetter && (
              <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 600 }}>
                (Decimal {step.decVal})
              </span>
            )}

            <ArrowDown size={14} className="group-arrow" />

            <div className="bits-row">
              {step.binary.split('').map((bit, bIdx) => (
                <div key={bIdx} className="bit-box" style={{ borderColor: '#3b82f6', color: '#93c5fd' }}>
                  {bit}
                </div>
              ))}
            </div>

            <div className="group-calc">
              {step.calculation}
            </div>
          </div>
        ))}
      </div>

      <div className="formula-banner">
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
          Combined Binary String:
        </div>
        <div>
          {steps.map(s => s.digit || s.char).join(' ')} ➔ {steps.map(s => s.binary).join(' ')}
        </div>
        <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Full Padded: <code>{fullPaddedOutput}₂</code>
        </div>
        <div style={{ color: '#34d399', fontWeight: 700, fontSize: '1.2rem', marginTop: '0.35rem' }}>
          Final Result (Trimmed): {finalOutput}₂
        </div>
      </div>
    </div>
  );
};
