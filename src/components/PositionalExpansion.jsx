import React from 'react';

export const PositionalExpansion = ({ 
  steps, 
  base, 
  formulaExpanded, 
  evaluatedWithValues, 
  valuesExpanded, 
  total 
}) => {
  return (
    <div className="positional-visualizer">
      <div className="positional-grid">
        {steps.map((s, idx) => (
          <div key={idx} className="positional-card">
            <div className="pos-digit">{s.digit || s.char}</div>
            <div className="pos-power">
              Position: <strong>{s.power}</strong> (base {base}<sup>{s.power}</sup> = {s.multiplier})
            </div>
            <div className="pos-calc">
              {s.isLetter ? `(${s.char}=${s.decVal}) × ${s.multiplier}` : `${s.digit || s.char} × ${s.multiplier}`}
            </div>
            <div className="pos-val">
              + {s.contribution}
            </div>
          </div>
        ))}
      </div>

      <div className="formula-banner">
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
          Step-by-step Positional Summation:
        </div>
        <div>
          = {formulaExpanded}
        </div>
        {evaluatedWithValues && (
          <div style={{ color: '#93c5fd' }}>
            = {evaluatedWithValues}
          </div>
        )}
        <div style={{ color: '#67e8f9' }}>
          = {valuesExpanded}
        </div>
        <div style={{ color: '#34d399', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.25rem' }}>
          = {total}₁₀
        </div>
      </div>
    </div>
  );
};
