/**
 * Formatting utilities for numbers and mathematical notation
 */

// Mapping of numbers to subscript characters
const subscriptMap = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
  '10': '₁₀',
  '16': '₁₆',
};

// Mapping of numbers to superscript characters (for exponents)
const superscriptMap = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '-': '⁻',
};

export const toSubscript = (base) => {
  const str = String(base);
  if (subscriptMap[str]) return subscriptMap[str];
  return str.split('').map(ch => subscriptMap[ch] || ch).join('');
};

export const toSuperscript = (num) => {
  const str = String(num);
  return str.split('').map(ch => superscriptMap[ch] || ch).join('');
};

/**
 * Format result string with radix subscript, e.g. "1101₂"
 */
export const formatWithBase = (value, base) => {
  return `${value}${toSubscript(base)}`;
};

/**
 * Group binary string into clusters of 4 or 3 from right to left
 */
export const groupBinary = (binaryStr, groupSize = 4) => {
  if (!binaryStr) return '';
  const clean = binaryStr.replace(/\s+/g, '');
  const remainder = clean.length % groupSize;
  const groups = [];
  
  let i = 0;
  if (remainder > 0) {
    groups.push(clean.slice(0, remainder));
    i = remainder;
  }
  for (; i < clean.length; i += groupSize) {
    groups.push(clean.slice(i, i + groupSize));
  }
  return groups.join(' ');
};

/**
 * Pad binary string to standard word sizes (8, 16, 32 bits)
 */
export const padBinaryToWidth = (binStr, width = 8) => {
  if (!binStr) return '';
  const targetWidth = Math.max(width, Math.ceil(binStr.length / width) * width);
  return binStr.padStart(targetWidth, '0');
};
