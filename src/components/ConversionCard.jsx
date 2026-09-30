import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftRight, 
  RotateCcw, 
  Copy, 
  Check, 
  AlertCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CONVERSION_MODES } from '../utils/conversions';
import { validateInput } from '../utils/validators';
import { StepVisualizer } from './StepVisualizer';
import { Badge } from './Badge';

// Sample presets for each mode
const PRESETS = {
  dec2bin: ['0', '13', '25', '64', '255', '1024'],
  bin2dec: ['0', '1101', '10101', '11111111', '10000000000'],
  dec2oct: ['0', '65', '128', '255', '512', '1000'],
  oct2dec: ['0', '75', '101', '377', '1777'],
  dec2hex: ['0', '25', '254', '255', '1024', '4095'],
  hex2dec: ['0', '1A', 'FE', 'FF', '3E8', 'FFFF'],
  bin2oct: ['0', '1101', '110101', '111100001', '1010101111'],
  oct2bin: ['0', '65', '127', '372', '755'],
  bin2hex: ['0', '1101', '11011110', '11111111', '101010111100'],
  hex2bin: ['0', 'A', 'DE', 'FF', '1A3F', 'BEEF']
};

export const ConversionCard = () => {
  const [selectedModeId, setSelectedModeId] = useState('dec2bin');
  const [inputVal, setInputVal] = useState('13');
  const [validationError, setValidationError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const currentMode = CONVERSION_MODES.find(m => m.id === selectedModeId) || CONVERSION_MODES[0];

  // Perform conversion on mount or when mode/input changes
  const executeConversion = (valToConvert = inputVal, modeToUse = currentMode) => {
    const validation = validateInput(valToConvert, modeToUse.from);
    if (!validation.isValid) {
      setValidationError(validation.error);
      setResult(null);
      return;
    }

    setValidationError('');
    try {
      const res = modeToUse.runner(validation.cleanValue);
      setResult(res);
    } catch (err) {
      console.error(err);
      setValidationError('Conversion failed. Please verify your input format.');
      setResult(null);
    }
  };

  // Run conversion whenever mode or input changes
  useEffect(() => {
    executeConversion(inputVal, currentMode);
  }, [selectedModeId]);

  const handleModeChange = (modeId) => {
    const nextMode = CONVERSION_MODES.find(m => m.id === modeId);
    setSelectedModeId(modeId);
    setInputVal(nextMode.defaultVal);
    executeConversion(nextMode.defaultVal, nextMode);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);

    const validation = validateInput(val, currentMode.from);
    if (!validation.isValid) {
      setValidationError(validation.error);
      setResult(null);
    } else {
      setValidationError('');
      try {
        const res = currentMode.runner(validation.cleanValue);
        setResult(res);
      } catch (err) {
        setResult(null);
      }
    }
  };

  const handleClear = () => {
    setInputVal('');
    setValidationError('');
    setResult(null);
  };

  const handleCopy = () => {
    if (!result?.output) return;
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Swap direction (e.g. dec2bin <-> bin2dec)
  const handleSwap = () => {
    const currentPair = [currentMode.from, currentMode.to];
    const reverseMode = CONVERSION_MODES.find(
      m => m.from === currentPair[1] && m.to === currentPair[0]
    );

    if (reverseMode) {
      setSelectedModeId(reverseMode.id);
      const nextVal = result?.output || reverseMode.defaultVal;
      setInputVal(nextVal);
      executeConversion(nextVal, reverseMode);
    }
  };

  const handlePresetClick = (preset) => {
    setInputVal(preset);
    executeConversion(preset, currentMode);
  };

  return (
    <div>
      {/* 10 Mode Selector Buttons */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeftRight size={18} />
            <span>Select Number System Conversion (10 Interactive Modes):</span>
          </h3>
          <Badge variant="blue">Base 2 • 8 • 10 • 16</Badge>
        </div>

        <div className="modes-grid">
          {CONVERSION_MODES.map((mode) => {
            const isActive = mode.id === selectedModeId;
            return (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`mode-btn ${isActive ? 'active' : ''}`}
              >
                <span>
                  {mode.from.charAt(0).toUpperCase() + mode.from.slice(1)}
                  <span className="mode-arrow">➔</span>
                  {mode.to.charAt(0).toUpperCase() + mode.to.slice(1)}
                </span>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  ({mode.fromBase}➔{mode.toBase})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Conversion Panel */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span style={{ color: '#38bdf8' }}>{currentMode.name}</span>
            <Badge variant="purple">Base {currentMode.fromBase} ➔ Base {currentMode.toBase}</Badge>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleSwap}
              className="btn btn-secondary"
              title="Reverse conversion direction"
            >
              <ArrowLeftRight size={15} />
              <span>Swap</span>
            </button>
            <button
              onClick={handleClear}
              className="btn btn-clear"
              title="Clear input"
            >
              <RotateCcw size={15} />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Input box */}
        <div className="input-group">
          <div className="input-label">
            <span>
              Enter <strong>{currentMode.from.toUpperCase()}</strong> Number:
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Allowed: {
                currentMode.from === 'decimal' ? 'Digits 0–9' :
                currentMode.from === 'binary' ? 'Bits 0, 1' :
                currentMode.from === 'octal' ? 'Digits 0–7' : '0–9, A–F'
              }
            </span>
          </div>

          <div className="input-container">
            <input
              type="text"
              className={`text-input ${validationError ? 'error' : ''}`}
              placeholder={currentMode.placeholder}
              value={inputVal}
              onChange={handleInputChange}
              autoComplete="off"
              spellCheck="false"
            />
            <button 
              className="btn btn-primary"
              onClick={() => executeConversion()}
            >
              <Sparkles size={16} />
              <span>Convert</span>
            </button>
          </div>

          {validationError && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{validationError}</span>
            </div>
          )}

          {/* Quick preset chips */}
          <div className="presets-bar">
            <span className="presets-label">Test Samples:</span>
            {(PRESETS[selectedModeId] || []).map((preset, idx) => (
              <button
                key={idx}
                type="button"
                className="preset-chip"
                onClick={() => handlePresetClick(preset)}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Result Banner */}
        {result && (
          <div className="result-banner">
            <div className="result-header">
              <span className="result-label">
                Conversion Result ({currentMode.to.toUpperCase()} • BASE {currentMode.toBase}):
              </span>
              <button 
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Value'}</span>
              </button>
            </div>

            <div className="result-value-row">
              <div className="result-main-value">
                {result.formattedOutput || result.output}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <code>{result.input}</code> ({currentMode.fromBase}) = <code>{result.output}</code> ({currentMode.toBase})
              </div>
            </div>
          </div>
        )}

        {/* Step-by-Step Educational Proof */}
        {result && (
          <StepVisualizer result={result} mode={currentMode} />
        )}
      </div>
    </div>
  );
};
