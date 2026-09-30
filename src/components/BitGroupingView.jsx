import React from 'react';
import { ArrowDown, Info } from 'lucide-react';

export const BitGroupingView = ({ 
  groups, 
  groupSize, 
  targetBase, 
  paddedBinary, 
  padLength,
  finalOutput 
}) => {
  return (
    <div className="grouping-visualizer">
      {padLength > 0 && (
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.65rem 0.9rem',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: '#fbbf24',
            marginBottom: '1rem'
          }}
        >
          <Info size={16} />
          <span>
            Binary bit length is not a multiple of {groupSize}. Added <strong>{padLength} leading zero(s)</strong> on the left to form a complete {groupSize}-bit group: <code style={{ color: '#fff' }}>{paddedBinary}</code>
          </span>
        </div>
      )}

      <div className="groups-container">
        {groups.map((grp, idx) => (
          <div key={idx} className="bit-group-box">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              Group #{idx + 1}
            </span>

            <div className="bits-row">
              {grp.bits.map((b, bIdx) => {
                const isPadded = grp.padded && bIdx < (padLength || 0);
                return (
                  <div key={bIdx} className={`bit-box ${isPadded ? 'padded-bit' : ''}`}>
                    {b}
                  </div>
                );
              })}
            </div>

            <ArrowDown size={14} className="group-arrow" />

            <div className="group-target-digit">
              {grp.digit}
            </div>

            <div className="group-calc">
              {grp.calculation}
            </div>
          </div>
        ))}
      </div>

      <div className="formula-banner">
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
          Concatenated Digits:
        </div>
        <div>
          {groups.map(g => g.rawGroup).join(' ')} ➔ {groups.map(g => g.digit).join(' ')}
        </div>
        <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '1.2rem', marginTop: '0.35rem' }}>
          Final Result: {finalOutput}{targetBase === 8 ? '₈' : '₁₆'}
        </div>
      </div>
    </div>
  );
};
