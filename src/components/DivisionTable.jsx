import React from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';

export const DivisionTable = ({ steps, divisor, isHex = false, finalOutput }) => {
  return (
    <div className="division-visualizer">
      <div className="math-table-container">
        <table className="math-table">
          <thead>
            <tr>
              <th>Step #</th>
              <th>Operation</th>
              <th>Quotient</th>
              <th>Remainder</th>
              {isHex && <th>Hex Digit</th>}
            </tr>
          </thead>
          <tbody>
            {steps.map((step, idx) => (
              <tr key={idx}>
                <td style={{ color: 'var(--text-dim)' }}>#{idx + 1}</td>
                <td>
                  <strong>{step.dividend}</strong> ÷ {step.divisor}
                </td>
                <td style={{ color: '#93c5fd' }}>{step.quotient}</td>
                <td className="remainder-col">
                  <strong>{step.remainder}</strong>
                  {step.letterNote && (
                    <span style={{ fontSize: '0.8rem', color: '#c084fc', marginLeft: '0.5rem' }}>
                      ({step.letterNote})
                    </span>
                  )}
                </td>
                {isHex && (
                  <td>
                    <span 
                      style={{ 
                        display: 'inline-block',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: step.isLetter ? 'rgba(192, 132, 252, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        color: step.isLetter ? '#c084fc' : '#fff',
                        fontWeight: '700'
                      }}
                    >
                      {step.hexDigit}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bottom-to-top-indicator">
        <ArrowUp size={20} />
        <div>
          <span>Read remainders from <strong>bottom to top</strong> (MSB to LSB): </span>
          <strong style={{ color: '#fff', fontSize: '1.05rem', marginLeft: '0.35rem' }}>
            {finalOutput}
          </strong>
        </div>
      </div>
    </div>
  );
};
