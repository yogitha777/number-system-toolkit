import React from 'react';
import { ConversionCard } from '../components/ConversionCard';
import { Badge } from '../components/Badge';
import { Sparkles, Terminal, BookOpen, Binary } from 'lucide-react';

export const ConversionsPage = () => {
  return (
    <div>
      {/* Hero Welcome */}
      <div className="hero-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Badge variant="blue">Interactive Computer Science Lab</Badge>
          <Badge variant="green">Real-time Calculation Engine</Badge>
        </div>
        <h2 className="hero-title">Number System Conversion Suite</h2>
        <p className="hero-subtitle">
          Interactively convert integers across Decimal (Base 10), Binary (Base 2), Octal (Base 8), and Hexadecimal (Base 16). 
          Explore the exact mathematical proof, division steps, and bit groupings behind every operation.
        </p>

        <div className="hero-tags">
          <Badge variant="cyan">Successive Division By Radix</Badge>
          <Badge variant="purple">Positional Weight Summation</Badge>
          <Badge variant="amber">3-Bit & 4-Bit Grouping Rules</Badge>
          <Badge variant="green">Zero & Large Integers Supported</Badge>
        </div>
      </div>

      {/* Main Conversion Tool */}
      <ConversionCard />
    </div>
  );
};
