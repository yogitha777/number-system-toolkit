import React from 'react';
import { BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { DivisionTable } from './DivisionTable';
import { PositionalExpansion } from './PositionalExpansion';
import { BitGroupingView } from './BitGroupingView';
import { DigitBreakdownView } from './DigitBreakdownView';
import { Badge } from './Badge';

export const StepVisualizer = ({ result, mode }) => {
  if (!result) return null;

  return (
    <div className="steps-container">
      <div className="step-section-title">
        <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
        <span>Educational Breakdown & Step-by-Step Proof</span>
      </div>

      {/* 1 & 2: Input meaning and Base description */}
      <div className="step-explanation-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Badge variant="blue">Source: {mode.from.toUpperCase()} (Base {mode.fromBase})</Badge>
          <span>➔</span>
          <Badge variant="purple">Target: {mode.to.toUpperCase()} (Base {mode.toBase})</Badge>
        </div>
        <p style={{ marginTop: '0.4rem', color: '#cbd5e1' }}>
          <strong>Understanding the input: </strong> 
          The input number <code>{result.input}</code> is expressed in <strong>{mode.from.toUpperCase()}</strong> (radix {mode.fromBase}). 
          {result.explanation}
        </p>
      </div>

      {/* 3 & 4: The calculation/steps */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '0.95rem', color: '#93c5fd', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <BookOpen size={16} /> Detailed Calculation Steps:
        </h4>

        {/* Dynamic visualizer according to conversion mechanism */}
        {(result.type === 'division' || result.type === 'division-hex') && (
          <DivisionTable 
            steps={result.steps} 
            divisor={result.divisor} 
            isHex={result.type === 'division-hex'} 
            finalOutput={result.output}
          />
        )}

        {(result.type === 'positional' || result.type === 'positional-hex') && (
          <PositionalExpansion 
            steps={result.steps} 
            base={result.base}
            formulaExpanded={result.formulaExpanded}
            evaluatedWithValues={result.evaluatedWithValues}
            valuesExpanded={result.valuesExpanded}
            total={result.output}
          />
        )}

        {result.type === 'grouping' && (
          <BitGroupingView 
            groups={result.groups}
            groupSize={result.groupSize}
            targetBase={result.targetBase}
            paddedBinary={result.paddedBinary}
            padLength={result.padLength}
            finalOutput={result.output}
          />
        )}

        {result.type === 'digit-expansion' && (
          <DigitBreakdownView 
            steps={result.steps}
            groupSize={result.groupSize}
            finalOutput={result.output}
            fullPaddedOutput={result.fullPaddedOutput}
          />
        )}
      </div>

      {/* 5: Final Answer Summary */}
      <div 
        style={{ 
          background: 'rgba(16, 185, 129, 0.08)', 
          border: '1px solid rgba(16, 185, 129, 0.25)', 
          borderRadius: '8px', 
          padding: '0.9rem 1.15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} style={{ color: '#34d399' }} />
          <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>
            Final Answer: <strong>({result.input}){mode.fromBase === 10 ? '₁₀' : mode.fromBase === 2 ? '₂' : mode.fromBase === 8 ? '₈' : '₁₆'} = ({result.output}){mode.toBase === 10 ? '₁₀' : mode.toBase === 2 ? '₂' : mode.toBase === 8 ? '₈' : '₁₆'}</strong>
          </span>
        </div>
        <Badge variant="green">Verified Accurate</Badge>
      </div>
    </div>
  );
};
