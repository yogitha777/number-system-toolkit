import React, { useState } from 'react';
import { 
  Layers, 
  Copy, 
  Check, 
  Cpu, 
  Hash, 
  Binary, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { getNumberRepresentations } from '../utils/operations';
import { validateInput } from '../utils/validators';
import { Badge } from '../components/Badge';

export const RepresentationPage = () => {
  const [decInput, setDecInput] = useState('255');
  const [error, setError] = useState('');
  const [repData, setRepData] = useState(() => getNumberRepresentations('255'));
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCalculate = (val = decInput) => {
    const valid = validateInput(val, 'decimal');
    if (!valid.isValid) {
      setError(valid.error);
      setRepData(null);
      return;
    }
    setError('');
    try {
      setRepData(getNumberRepresentations(valid.cleanValue));
    } catch (e) {
      setError('Number too large or invalid.');
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setDecInput(val);
    const valid = validateInput(val, 'decimal');
    if (!valid.isValid) {
      setError(valid.error);
      setRepData(null);
    } else {
      setError('');
      try {
        setRepData(getNumberRepresentations(valid.cleanValue));
      } catch (e) {
        setRepData(null);
      }
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const presets = ['0', '13', '42', '128', '255', '512', '1024', '4096', '65535'];

  return (
    <div>
      {/* Hero Welcome */}
      <div className="hero-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Badge variant="purple">Feature 14</Badge>
          <Badge variant="blue">Unified Register & Memory Inspector</Badge>
        </div>
        <h2 className="hero-title">All-in-One Number Representation</h2>
        <p className="hero-subtitle">
          Input a single decimal integer to view its simultaneous representations across all four core computing number systems:
          Decimal, Binary, Octal, and Hexadecimal, complete with bit lengths and memory byte alignments.
        </p>
      </div>

      {/* Input Form */}
      <div className="card">
        <div className="input-group">
          <div className="input-label">
            <span>Enter Decimal Integer:</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Non-negative integer (Base 10)
            </span>
          </div>

          <div className="input-container">
            <input
              type="text"
              className={`text-input ${error ? 'error' : ''}`}
              value={decInput}
              onChange={handleInputChange}
              placeholder="e.g. 255, 1024"
            />
            <button className="btn btn-primary" onClick={() => handleCalculate()}>
              <Sparkles size={16} />
              <span>Inspect All Bases</span>
            </button>
            <button 
              className="btn btn-clear"
              onClick={() => {
                setDecInput('');
                setError('');
                setRepData(null);
              }}
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {error && (
            <div className="error-message">
              <Info size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="presets-bar">
            <span className="presets-label">Quick Presets:</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="preset-chip"
                onClick={() => {
                  setDecInput(p);
                  handleCalculate(p);
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Multi-Base Cards */}
      {repData && (
        <>
          <div className="representation-grid">
            {/* 1. DECIMAL */}
            <div className="rep-card" style={{ borderTop: '3px solid #3b82f6' }}>
              <div>
                <div className="rep-card-top">
                  <span className="rep-name">Decimal (Denary)</span>
                  <Badge variant="blue">Base 10</Badge>
                </div>
                <div className="rep-value" style={{ color: '#60a5fa', margin: '0.75rem 0' }}>
                  {repData.decimal.formatted}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  Standard positional representation used by humans with symbols 0–9.
                </p>
              </div>
              <button 
                className={`copy-btn ${copiedKey === 'dec' ? 'copied' : ''}`}
                onClick={() => handleCopy(repData.decimal.raw, 'dec')}
              >
                {copiedKey === 'dec' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedKey === 'dec' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* 2. BINARY */}
            <div className="rep-card" style={{ borderTop: '3px solid #10b981' }}>
              <div>
                <div className="rep-card-top">
                  <span className="rep-name">Binary (Machine Code)</span>
                  <Badge variant="green">Base 2</Badge>
                </div>
                <div className="rep-value" style={{ color: '#34d399', margin: '0.75rem 0' }}>
                  {repData.binary.formatted}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  Grouped (4-bit nibbles): <code>{repData.binary.grouped4}</code>
                </p>
              </div>
              <button 
                className={`copy-btn ${copiedKey === 'bin' ? 'copied' : ''}`}
                onClick={() => handleCopy(repData.binary.raw, 'bin')}
              >
                {copiedKey === 'bin' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedKey === 'bin' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* 3. OCTAL */}
            <div className="rep-card" style={{ borderTop: '3px solid #f59e0b' }}>
              <div>
                <div className="rep-card-top">
                  <span className="rep-name">Octal (UNIX / PDP)</span>
                  <Badge variant="amber">Base 8</Badge>
                </div>
                <div className="rep-value" style={{ color: '#fbbf24', margin: '0.75rem 0' }}>
                  {repData.octal.formatted}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  C/C++ literal: <code>{repData.octal.prefixed}</code>
                </p>
              </div>
              <button 
                className={`copy-btn ${copiedKey === 'oct' ? 'copied' : ''}`}
                onClick={() => handleCopy(repData.octal.raw, 'oct')}
              >
                {copiedKey === 'oct' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedKey === 'oct' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* 4. HEXADECIMAL */}
            <div className="rep-card" style={{ borderTop: '3px solid #8b5cf6' }}>
              <div>
                <div className="rep-card-top">
                  <span className="rep-name">Hexadecimal (Memory)</span>
                  <Badge variant="purple">Base 16</Badge>
                </div>
                <div className="rep-value" style={{ color: '#c084fc', margin: '0.75rem 0' }}>
                  {repData.hexadecimal.formatted}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  C++ / Hex literal: <code>{repData.hexadecimal.prefixed}</code>
                </p>
              </div>
              <button 
                className={`copy-btn ${copiedKey === 'hex' ? 'copied' : ''}`}
                onClick={() => handleCopy(repData.hexadecimal.raw, 'hex')}
              >
                {copiedKey === 'hex' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedKey === 'hex' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Computer Architecture / Hardware Storage Inspector */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Cpu size={20} style={{ color: '#38bdf8' }} />
                <span>Hardware Memory & Register Layout</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Badge variant="cyan">{repData.meta.bitsNeeded} Bits Active</Badge>
                <Badge variant="purple">{repData.meta.bytesNeeded} Byte(s)</Badge>
                <Badge variant="amber">{repData.meta.nibblesNeeded} Nibble(s)</Badge>
              </div>
            </div>

            {/* Visual Register Bit Lamps (shows 8-bit or 16-bit word) */}
            <div style={{ margin: '1rem 0' }}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                Byte Register Visualization (Padded to 8-bit boundary):
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {repData.binary.bytePadded8.split('').map((bit, idx) => {
                  const bitIndexFromRight = repData.binary.bytePadded8.length - 1 - idx;
                  const weight = 2 ** bitIndexFromRight;
                  const isActive = bit === '1';

                  return (
                    <div 
                      key={idx}
                      style={{
                        flex: '1 1 70px',
                        background: isActive ? 'rgba(59, 130, 246, 0.15)' : '#161e2e',
                        border: `1px solid ${isActive ? '#3b82f6' : '#27354f'}`,
                        borderRadius: '8px',
                        padding: '0.65rem 0.4rem',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                        2<sup>{bitIndexFromRight}</sup> ({weight})
                      </span>
                      <span 
                        style={{ 
                          fontSize: '1.4rem', 
                          fontWeight: 800, 
                          fontFamily: 'var(--font-mono)',
                          color: isActive ? '#60a5fa' : '#475569' 
                        }}
                      >
                        {bit}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: isActive ? '#34d399' : 'transparent', fontWeight: 700 }}>
                        {isActive ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="step-explanation-box" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
              <strong>DSA & System Architecture Note: </strong>
              In modern C++ and x86_64 architecture, integer types occupy fixed word sizes: 
              <code>char</code> (1 byte / 8 bits), <code>short</code> (2 bytes / 16 bits), <code>int</code> (4 bytes / 32 bits), and <code>long long</code> (8 bytes / 64 bits). 
              For the number <strong>{repData.decimal.raw}</strong>, at least <strong>{repData.meta.bitsNeeded} bits</strong> are required to represent its magnitude in binary unsigned storage.
            </div>
          </div>
        </>
      )}
    </div>
  );
};
