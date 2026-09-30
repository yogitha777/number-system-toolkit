/**
 * Core number system conversion logic with detailed educational steps.
 * Covers:
 * 1. Decimal -> Binary
 * 2. Binary -> Decimal
 * 3. Decimal -> Octal
 * 4. Octal -> Decimal
 * 5. Decimal -> Hexadecimal
 * 6. Hexadecimal -> Decimal
 * 7. Binary -> Octal (group of 3)
 * 8. Octal -> Binary (3-bit per digit)
 * 9. Binary -> Hexadecimal (group of 4)
 * 10. Hexadecimal -> Binary (4-bit per digit)
 */

import { toSuperscript, formatWithBase } from './formatters.js';

const HEX_MAP = {
  10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'
};

const HEX_VAL_MAP = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
  '8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15
};

/**
 * 1. DECIMAL TO BINARY
 * Uses successive division by 2
 */
export const decimalToBinary = (inputStr) => {
  const num = BigInt(inputStr);
  if (num === 0n) {
    return {
      input: '0',
      output: '0',
      formattedOutput: '0₂',
      type: 'division',
      divisor: 2,
      baseName: 'Binary (Base 2)',
      steps: [
        { dividend: '0', divisor: 2, quotient: '0', remainder: '0' }
      ],
      explanation: 'Dividing 0 by 2 gives a quotient of 0 with remainder 0.',
      summary: 'Reading remainders bottom-to-top gives 0₂.'
    };
  }

  let current = num;
  const steps = [];
  const remainders = [];

  while (current > 0n) {
    const quotient = current / 2n;
    const remainder = current % 2n;
    steps.push({
      dividend: current.toString(),
      divisor: 2,
      quotient: quotient.toString(),
      remainder: remainder.toString()
    });
    remainders.push(remainder.toString());
    current = quotient;
  }

  // Remainders in reverse order
  const binaryResult = [...remainders].reverse().join('');

  return {
    input: inputStr,
    output: binaryResult,
    formattedOutput: formatWithBase(binaryResult, 2),
    type: 'division',
    divisor: 2,
    baseName: 'Binary (Base 2)',
    steps,
    remainders: remainders.slice().reverse(),
    explanation:
      'Repeatedly divide the decimal number by 2 until the quotient reaches 0. The remainder at each step represents a binary bit. Read the remainders from the last step to the first step (bottom-to-top / Most Significant Bit to Least Significant Bit).',
    summary: `Read remainders from bottom to top: ${binaryResult}`
  };
};

/**
 * 2. BINARY TO DECIMAL
 * Positional expansion with base 2
 */
export const binaryToDecimal = (binStr) => {
  const clean = binStr.replace(/\s+/g, '');
  const len = clean.length;
  const steps = [];
  let total = 0n;

  for (let i = 0; i < len; i++) {
    const digit = clean[i];
    const power = len - 1 - i;
    const multiplier = 2n ** BigInt(power);
    const contribution = BigInt(digit) * multiplier;
    total += contribution;

    steps.push({
      digit,
      power,
      multiplier: multiplier.toString(),
      contribution: contribution.toString(),
      expression: `${digit} × 2${toSuperscript(power)}`
    });
  }

  const formulaExpanded = steps.map(s => s.expression).join(' + ');
  const valuesExpanded = steps.map(s => s.contribution).join(' + ');

  return {
    input: binStr,
    output: total.toString(),
    formattedOutput: formatWithBase(total.toString(), 10),
    type: 'positional',
    base: 2,
    baseName: 'Decimal (Base 10)',
    steps,
    formulaExpanded,
    valuesExpanded,
    explanation:
      'Each binary digit is weighted by a power of 2, starting from 2⁰ for the rightmost digit (least significant bit) and increasing by 1 for each position to the left.',
    summary: `= ${formulaExpanded}\n= ${valuesExpanded}\n= ${total.toString()}`
  };
};

/**
 * 3. DECIMAL TO OCTAL
 * Uses successive division by 8
 */
export const decimalToOctal = (inputStr) => {
  const num = BigInt(inputStr);
  if (num === 0n) {
    return {
      input: '0',
      output: '0',
      formattedOutput: '0₈',
      type: 'division',
      divisor: 8,
      baseName: 'Octal (Base 8)',
      steps: [
        { dividend: '0', divisor: 8, quotient: '0', remainder: '0' }
      ],
      explanation: 'Dividing 0 by 8 yields quotient 0 and remainder 0.',
      summary: 'Reading remainders bottom-to-top gives 0₈.'
    };
  }

  let current = num;
  const steps = [];
  const remainders = [];

  while (current > 0n) {
    const quotient = current / 8n;
    const remainder = current % 8n;
    steps.push({
      dividend: current.toString(),
      divisor: 8,
      quotient: quotient.toString(),
      remainder: remainder.toString()
    });
    remainders.push(remainder.toString());
    current = quotient;
  }

  const octalResult = [...remainders].reverse().join('');

  return {
    input: inputStr,
    output: octalResult,
    formattedOutput: formatWithBase(octalResult, 8),
    type: 'division',
    divisor: 8,
    baseName: 'Octal (Base 8)',
    steps,
    remainders: remainders.slice().reverse(),
    explanation:
      'Repeatedly divide the decimal integer by 8 until the quotient is 0. The remainder at each step is an octal digit (0–7). Read the remainders from bottom to top.',
    summary: `Read remainders from bottom to top: ${octalResult}`
  };
};

/**
 * 4. OCTAL TO DECIMAL
 * Positional expansion with base 8
 */
export const octalToDecimal = (octStr) => {
  const clean = octStr.trim();
  const len = clean.length;
  const steps = [];
  let total = 0n;

  for (let i = 0; i < len; i++) {
    const digit = clean[i];
    const power = len - 1 - i;
    const multiplier = 8n ** BigInt(power);
    const contribution = BigInt(digit) * multiplier;
    total += contribution;

    steps.push({
      digit,
      power,
      multiplier: multiplier.toString(),
      contribution: contribution.toString(),
      expression: `${digit} × 8${toSuperscript(power)}`
    });
  }

  const formulaExpanded = steps.map(s => s.expression).join(' + ');
  const valuesExpanded = steps.map(s => s.contribution).join(' + ');

  return {
    input: octStr,
    output: total.toString(),
    formattedOutput: formatWithBase(total.toString(), 10),
    type: 'positional',
    base: 8,
    baseName: 'Decimal (Base 10)',
    steps,
    formulaExpanded,
    valuesExpanded,
    explanation:
      'Multiply each octal digit by 8 raised to the power of its position (indexing from 0 from right to left), then sum the results.',
    summary: `= ${formulaExpanded}\n= ${valuesExpanded}\n= ${total.toString()}`
  };
};

/**
 * 5. DECIMAL TO HEXADECIMAL
 * Uses successive division by 16 with letter mapping (10->A ... 15->F)
 */
export const decimalToHexadecimal = (inputStr) => {
  const num = BigInt(inputStr);
  if (num === 0n) {
    return {
      input: '0',
      output: '0',
      formattedOutput: '0₁₆',
      type: 'division-hex',
      divisor: 16,
      baseName: 'Hexadecimal (Base 16)',
      steps: [
        {
          dividend: '0',
          divisor: 16,
          quotient: '0',
          remainder: '0',
          hexDigit: '0',
          isLetter: false
        }
      ],
      explanation: 'Dividing 0 by 16 yields quotient 0 and remainder 0.',
      summary: 'Reading remainders bottom-to-top gives 0₁₆.'
    };
  }

  let current = num;
  const steps = [];
  const hexDigits = [];

  while (current > 0n) {
    const quotient = current / 16n;
    const remainder = Number(current % 16n);
    const hexDigit = remainder >= 10 ? HEX_MAP[remainder] : remainder.toString();
    const isLetter = remainder >= 10;

    steps.push({
      dividend: current.toString(),
      divisor: 16,
      quotient: quotient.toString(),
      remainder: remainder.toString(),
      hexDigit,
      isLetter,
      letterNote: isLetter ? `${remainder} = ${hexDigit}` : null
    });
    hexDigits.push(hexDigit);
    current = quotient;
  }

  const hexResult = [...hexDigits].reverse().join('');

  return {
    input: inputStr,
    output: hexResult,
    formattedOutput: formatWithBase(hexResult, 16),
    type: 'division-hex',
    divisor: 16,
    baseName: 'Hexadecimal (Base 16)',
    steps,
    hexDigits: hexDigits.slice().reverse(),
    explanation:
      'Repeatedly divide the decimal number by 16 until the quotient reaches 0. For remainders from 10 to 15, replace them with their hexadecimal letter equivalents (10=A, 11=B, 12=C, 13=D, 14=E, 15=F). Read remainders from bottom to top.',
    summary: `Read hexadecimal digits from bottom to top: ${hexResult}`
  };
};

/**
 * 6. HEXADECIMAL TO DECIMAL
 * Positional expansion with base 16
 */
export const hexadecimalToDecimal = (hexStr) => {
  const clean = hexStr.toUpperCase().replace(/^0X/, '').trim();
  const len = clean.length;
  const steps = [];
  let total = 0n;

  for (let i = 0; i < len; i++) {
    const char = clean[i];
    const decVal = BigInt(HEX_VAL_MAP[char]);
    const power = len - 1 - i;
    const multiplier = 16n ** BigInt(power);
    const contribution = decVal * multiplier;
    total += contribution;

    steps.push({
      char,
      decVal: decVal.toString(),
      isLetter: char >= 'A' && char <= 'F',
      power,
      multiplier: multiplier.toString(),
      contribution: contribution.toString(),
      expression: `${char} × 16${toSuperscript(power)}`,
      evaluatedExpression: `${decVal} × ${multiplier}`
    });
  }

  const formulaExpanded = steps.map(s => s.expression).join(' + ');
  const evaluatedWithValues = steps.map(s => `(${s.decVal} × ${s.multiplier})`).join(' + ');
  const valuesExpanded = steps.map(s => s.contribution).join(' + ');

  return {
    input: hexStr,
    output: total.toString(),
    formattedOutput: formatWithBase(total.toString(), 10),
    type: 'positional-hex',
    base: 16,
    baseName: 'Decimal (Base 10)',
    steps,
    formulaExpanded,
    evaluatedWithValues,
    valuesExpanded,
    explanation:
      'Convert each hexadecimal letter to its decimal value (A=10, B=11, C=12, D=13, E=14, F=15). Then multiply by 16 raised to the positional power and sum all contributions.',
    summary: `= ${formulaExpanded}\n= ${evaluatedWithValues}\n= ${valuesExpanded}\n= ${total.toString()}`
  };
};

/**
 * 7. BINARY TO OCTAL
 * Group binary digits in chunks of 3 from right to left
 */
export const binaryToOctal = (binStr) => {
  const clean = binStr.replace(/\s+/g, '');
  if (clean === '0') {
    return {
      input: '0',
      output: '0',
      formattedOutput: '0₈',
      type: 'grouping',
      groupSize: 3,
      targetBase: 8,
      paddedBinary: '000',
      groups: [
        {
          raw: '0',
          padded: '000',
          bits: ['0', '0', '0'],
          calculation: '0×4 + 0×2 + 0×1 = 0',
          octalDigit: '0'
        }
      ],
      explanation: 'Group into 3 bits. 000₂ = 0₈.',
      summary: 'Output: 0₈'
    };
  }

  // Calculate padding needed on left
  const remainder = clean.length % 3;
  const padLength = remainder === 0 ? 0 : 3 - remainder;
  const paddedBinary = '0'.repeat(padLength) + clean;

  const groups = [];
  const octalDigits = [];

  for (let i = 0; i < paddedBinary.length; i += 3) {
    const chunk = paddedBinary.slice(i, i + 3);
    const b2 = Number(chunk[0]);
    const b1 = Number(chunk[1]);
    const b0 = Number(chunk[2]);
    const octVal = b2 * 4 + b1 * 2 + b0 * 1;
    octalDigits.push(octVal.toString());

    groups.push({
      rawGroup: chunk,
      padded: padLength > 0 && i === 0,
      bits: chunk.split(''),
      weights: [4, 2, 1],
      calculation: `(${b2} × 4) + (${b1} × 2) + (${b0} × 1) = ${octVal}`,
      digit: octVal.toString()
    });
  }

  let finalOctal = octalDigits.join('');
  // Remove leading zeros unless it's just '0'
  const trimmedOctal = finalOctal.replace(/^0+/, '') || '0';

  return {
    input: binStr,
    output: trimmedOctal,
    formattedOutput: formatWithBase(trimmedOctal, 8),
    type: 'grouping',
    groupSize: 3,
    targetBase: 8,
    paddedBinary,
    padLength,
    groups,
    explanation:
      'Because 8 = 2³, exactly 3 binary bits equal 1 octal digit. Group the binary number into sets of 3 from right to left. If the leftmost group has fewer than 3 bits, pad it with leading zeros. Then convert each 3-bit group into its octal digit (weights: 4, 2, 1).',
    summary: `Grouped bits: ${groups.map(g => g.rawGroup).join(' ')} \nOctal digits: ${groups.map(g => g.digit).join(' ')} \nResult: ${trimmedOctal}₈`
  };
};

/**
 * 8. OCTAL TO BINARY
 * Convert each octal digit into 3-bit binary equivalent
 */
export const octalToBinary = (octStr) => {
  const clean = octStr.trim();
  const digits = clean.split('');
  const steps = [];
  const binaryGroups = [];

  digits.forEach((digitChar, idx) => {
    const num = Number(digitChar);
    const b2 = Math.floor(num / 4);
    const b1 = Math.floor((num % 4) / 2);
    const b0 = num % 2;
    const bit3Str = `${b2}${b1}${b0}`;
    binaryGroups.push(bit3Str);

    steps.push({
      index: idx,
      digit: digitChar,
      val: num,
      binary: bit3Str,
      calculation: `${num} = ${b2}×4 + ${b1}×2 + ${b0}×1 ➔ ${bit3Str}`
    });
  });

  const fullBinary = binaryGroups.join('');
  const trimmedBinary = fullBinary.replace(/^0+/, '') || '0';

  return {
    input: octStr,
    output: trimmedBinary,
    fullPaddedOutput: fullBinary,
    formattedOutput: formatWithBase(trimmedBinary, 2),
    type: 'digit-expansion',
    groupSize: 3,
    steps,
    explanation:
      'Each octal digit (0–7) directly represents 3 binary bits (since 2³ = 8). Replace each octal digit with its corresponding 3-bit binary pattern, then concatenate all the bit groups.',
    summary: `Each digit ➔ 3 bits: ${steps.map(s => `${s.digit} ➔ ${s.binary}`).join(', ')}\nConcatenated: ${fullBinary}₂ (trimmed: ${trimmedBinary}₂)`
  };
};

/**
 * 9. BINARY TO HEXADECIMAL
 * Group binary digits in chunks of 4 from right to left
 */
export const binaryToHexadecimal = (binStr) => {
  const clean = binStr.replace(/\s+/g, '');
  if (clean === '0') {
    return {
      input: '0',
      output: '0',
      formattedOutput: '0₁₆',
      type: 'grouping',
      groupSize: 4,
      targetBase: 16,
      paddedBinary: '0000',
      groups: [
        {
          rawGroup: '0000',
          bits: ['0', '0', '0', '0'],
          calculation: '0×8 + 0×4 + 0×2 + 0×1 = 0',
          digit: '0'
        }
      ],
      explanation: 'Group into 4 bits. 0000₂ = 0₁₆.',
      summary: 'Output: 0₁₆'
    };
  }

  const remainder = clean.length % 4;
  const padLength = remainder === 0 ? 0 : 4 - remainder;
  const paddedBinary = '0'.repeat(padLength) + clean;

  const groups = [];
  const hexDigits = [];

  for (let i = 0; i < paddedBinary.length; i += 4) {
    const chunk = paddedBinary.slice(i, i + 4);
    const b3 = Number(chunk[0]);
    const b2 = Number(chunk[1]);
    const b1 = Number(chunk[2]);
    const b0 = Number(chunk[3]);
    const decVal = b3 * 8 + b2 * 4 + b1 * 2 + b0 * 1;
    const hexDigit = decVal >= 10 ? HEX_MAP[decVal] : decVal.toString();
    const isLetter = decVal >= 10;
    hexDigits.push(hexDigit);

    groups.push({
      rawGroup: chunk,
      padded: padLength > 0 && i === 0,
      bits: chunk.split(''),
      weights: [8, 4, 2, 1],
      decVal,
      digit: hexDigit,
      isLetter,
      letterNote: isLetter ? `${decVal} = ${hexDigit}` : null,
      calculation: `(${b3}×8) + (${b2}×4) + (${b1}×2) + (${b0}×1) = ${decVal}${isLetter ? ` ➔ ${hexDigit}` : ''}`
    });
  }

  const finalHex = hexDigits.join('');
  const trimmedHex = finalHex.replace(/^0+/, '') || '0';

  return {
    input: binStr,
    output: trimmedHex,
    formattedOutput: formatWithBase(trimmedHex, 16),
    type: 'grouping',
    groupSize: 4,
    targetBase: 16,
    paddedBinary,
    padLength,
    groups,
    explanation:
      'Because 16 = 2⁴, exactly 4 binary bits equal 1 hexadecimal digit. Group the binary number into sets of 4 bits from right to left. Pad the leftmost group with leading zeros if necessary. Calculate the decimal value of each group (weights: 8, 4, 2, 1) and convert 10–15 to A–F.',
    summary: `Grouped bits: ${groups.map(g => g.rawGroup).join(' ')}\nHex digits: ${groups.map(g => g.digit).join(' ')}\nResult: ${trimmedHex}₁₆`
  };
};

/**
 * 10. HEXADECIMAL TO BINARY
 * Convert each hexadecimal digit into 4-bit binary equivalent
 */
export const hexadecimalToBinary = (hexStr) => {
  const clean = hexStr.toUpperCase().replace(/^0X/, '').trim();
  const digits = clean.split('');
  const steps = [];
  const binaryGroups = [];

  digits.forEach((char, idx) => {
    const decVal = HEX_VAL_MAP[char];
    // 4-bit binary representation
    const b3 = Math.floor(decVal / 8);
    const b2 = Math.floor((decVal % 8) / 4);
    const b1 = Math.floor((decVal % 4) / 2);
    const b0 = decVal % 2;
    const bit4Str = `${b3}${b2}${b1}${b0}`;
    binaryGroups.push(bit4Str);

    steps.push({
      index: idx,
      char,
      decVal,
      isLetter: char >= 'A' && char <= 'F',
      binary: bit4Str,
      calculation: `${char}${char >= 'A' ? ` (${decVal})` : ''} = ${b3}×8 + ${b2}×4 + ${b1}×2 + ${b0}×1 ➔ ${bit4Str}`
    });
  });

  const fullBinary = binaryGroups.join('');
  const trimmedBinary = fullBinary.replace(/^0+/, '') || '0';

  return {
    input: hexStr,
    output: trimmedBinary,
    fullPaddedOutput: fullBinary,
    formattedOutput: formatWithBase(trimmedBinary, 2),
    type: 'digit-expansion',
    groupSize: 4,
    steps,
    explanation:
      'Each hexadecimal digit directly corresponds to a 4-bit nibble (since 2⁴ = 16). Convert each hex digit (A=10, ..., F=15) into its 4-bit binary equivalent, then combine all 4-bit groups together.',
    summary: `Each hex digit ➔ 4 bits: ${steps.map(s => `${s.char} ➔ ${s.binary}`).join(', ')}\nConcatenated: ${fullBinary}₂ (trimmed: ${trimmedBinary}₂)`
  };
};

/**
 * Universal dispatcher
 */
export const CONVERSION_MODES = [
  {
    id: 'dec2bin',
    name: 'Decimal to Binary',
    from: 'decimal',
    to: 'binary',
    fromBase: 10,
    toBase: 2,
    placeholder: 'e.g. 13, 25, 255',
    defaultVal: '13',
    runner: decimalToBinary
  },
  {
    id: 'bin2dec',
    name: 'Binary to Decimal',
    from: 'binary',
    to: 'decimal',
    fromBase: 2,
    toBase: 10,
    placeholder: 'e.g. 1101, 101011',
    defaultVal: '1101',
    runner: binaryToDecimal
  },
  {
    id: 'dec2oct',
    name: 'Decimal to Octal',
    from: 'decimal',
    to: 'octal',
    fromBase: 10,
    toBase: 8,
    placeholder: 'e.g. 65, 128, 512',
    defaultVal: '65',
    runner: decimalToOctal
  },
  {
    id: 'oct2dec',
    name: 'Octal to Decimal',
    from: 'octal',
    to: 'decimal',
    fromBase: 8,
    toBase: 10,
    placeholder: 'e.g. 75, 101, 777',
    defaultVal: '75',
    runner: octalToDecimal
  },
  {
    id: 'dec2hex',
    name: 'Decimal to Hexadecimal',
    from: 'decimal',
    to: 'hexadecimal',
    fromBase: 10,
    toBase: 16,
    placeholder: 'e.g. 254, 420, 1024',
    defaultVal: '254',
    runner: decimalToHexadecimal
  },
  {
    id: 'hex2dec',
    name: 'Hexadecimal to Decimal',
    from: 'hexadecimal',
    to: 'decimal',
    fromBase: 16,
    toBase: 10,
    placeholder: 'e.g. FE, 1A3, 7FF',
    defaultVal: 'FE',
    runner: hexadecimalToDecimal
  },
  {
    id: 'bin2oct',
    name: 'Binary to Octal',
    from: 'binary',
    to: 'octal',
    fromBase: 2,
    toBase: 8,
    placeholder: 'e.g. 110101, 1011101',
    defaultVal: '110101',
    runner: binaryToOctal
  },
  {
    id: 'oct2bin',
    name: 'Octal to Binary',
    from: 'octal',
    to: 'binary',
    fromBase: 8,
    toBase: 2,
    placeholder: 'e.g. 65, 372, 705',
    defaultVal: '65',
    runner: octalToBinary
  },
  {
    id: 'bin2hex',
    name: 'Binary to Hexadecimal',
    from: 'binary',
    to: 'hexadecimal',
    fromBase: 2,
    toBase: 16,
    placeholder: 'e.g. 11011110, 10101011',
    defaultVal: '11011110',
    runner: binaryToHexadecimal
  },
  {
    id: 'hex2bin',
    name: 'Hexadecimal to Binary',
    from: 'hexadecimal',
    to: 'binary',
    fromBase: 16,
    toBase: 2,
    placeholder: 'e.g. DE, 4B, 1A3F',
    defaultVal: 'DE',
    runner: hexadecimalToBinary
  }
];
