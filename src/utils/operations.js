/**
 * Number Operations:
 * 1. Prime Number Checker (with trial division steps up to sqrt(n))
 * 2. Even / Odd Checker (with modulo & bitwise explanations)
 * 3. Multi-Base Number Representation (Decimal, Binary, Octal, Hex, byte breakdown)
 */

import { formatWithBase, padBinaryToWidth, groupBinary } from './formatters.js';

/**
 * Check if a number is prime with educational step-by-step trial division
 */
export const checkPrime = (numStr) => {
  const n = BigInt(numStr);
  
  if (n <= 1n) {
    let reason = '';
    if (n < 0n) {
      reason = 'Negative numbers cannot be prime by definition because prime numbers are integers strictly greater than 1.';
    } else if (n === 0n) {
      reason = '0 is not a prime number because it has infinitely many divisors (any non-zero integer divides 0).';
    } else if (n === 1n) {
      reason = '1 is not a prime number. A prime number must have exactly two distinct positive divisors: 1 and itself. 1 only has one divisor (itself).';
    }

    return {
      num: numStr,
      isPrime: false,
      title: `${numStr} is NOT Prime`,
      statusClass: 'danger',
      steps: [
        { test: `n ≤ 1`, result: 'Failed', explanation: reason }
      ],
      summary: reason,
      algorithmNote: 'Domain restriction: Prime numbers are natural numbers greater than 1.'
    };
  }

  if (n === 2n) {
    return {
      num: numStr,
      isPrime: true,
      title: '2 is PRIME (The only even prime number)',
      statusClass: 'success',
      steps: [
        { test: 'Divisors of 2', result: '1 and 2', explanation: '2 has exactly two distinct positive divisors: 1 and 2.' }
      ],
      summary: '2 is the smallest prime number and the only even prime number in mathematics.',
      algorithmNote: 'Base prime case.'
    };
  }

  if (n % 2n === 0n) {
    const half = n / 2n;
    return {
      num: numStr,
      isPrime: false,
      title: `${numStr} is COMPOSITE (Not Prime)`,
      statusClass: 'danger',
      steps: [
        { test: `${numStr} ÷ 2`, result: `${half} remainder 0`, explanation: `${numStr} is divisible by 2 (${numStr} = 2 × ${half}). Any even number greater than 2 is composite.` }
      ],
      summary: `${numStr} is divisible by 2. Thus it has at least three divisors: 1, 2, and ${numStr}.`,
      algorithmNote: 'Even parity check eliminated this number in O(1).'
    };
  }

  // Convert to Number for trial division if within safe integer range
  // Or trial division up to sqrt
  const steps = [];
  steps.push({
    test: 'Even parity check',
    result: 'Passed (Odd)',
    explanation: `${numStr} is not divisible by 2.`
  });

  // Calculate approximate sqrt(n)
  let limit;
  if (n <= BigInt(Number.MAX_SAFE_INTEGER)) {
    limit = BigInt(Math.floor(Math.sqrt(Number(n))));
  } else {
    // For very large BigInts, approximate integer square root
    let x0 = n / 2n;
    if (x0 !== 0n) {
      let x1 = (x0 + n / x0) / 2n;
      while (x1 < x0) {
        x0 = x1;
        x1 = (x0 + n / x0) / 2n;
      }
      limit = x0;
    } else {
      limit = 1n;
    }
  }

  let foundDivisor = null;
  const maxStepsToShow = 15;
  let testCount = 0;

  for (let d = 3n; d <= limit; d += 2n) {
    testCount++;
    const rem = n % d;
    const quotient = n / d;

    if (testCount <= maxStepsToShow || rem === 0n) {
      steps.push({
        test: `${numStr} mod ${d}`,
        result: rem === 0n ? `0 (Divisible!)` : `${rem} (Remainder)`,
        explanation: rem === 0n 
          ? `Found divisor! ${numStr} ÷ ${d} = ${quotient}. Therefore, ${d} is a factor.`
          : `${numStr} ÷ ${d} = ${quotient} with remainder ${rem}. Not a divisor.`
      });
    }

    if (rem === 0n) {
      foundDivisor = d;
      break;
    }
  }

  if (foundDivisor !== null) {
    const quotient = n / foundDivisor;
    return {
      num: numStr,
      isPrime: false,
      title: `${numStr} is COMPOSITE (Not Prime)`,
      statusClass: 'danger',
      steps,
      summary: `Found factor: ${foundDivisor}. Since ${numStr} = ${foundDivisor} × ${quotient}, it has factors other than 1 and itself.`,
      algorithmNote: `Trial division stopped at divisor ${foundDivisor} ≤ ⌊√${numStr}⌋ = ${limit}.`
    };
  }

  return {
    num: numStr,
    isPrime: true,
    title: `${numStr} is a PRIME Number!`,
    statusClass: 'success',
    steps,
    summary: `No odd divisors found up to ⌊√${numStr}⌋ = ${limit}. Therefore, ${numStr} has no factors other than 1 and ${numStr}.`,
    algorithmNote: `Trial Division Property: If a number n is composite, it must have at least one prime factor ≤ √n. Since none was found up to ${limit}, ${numStr} is guaranteed prime.`
  };
};

/**
 * Check Even / Odd with Modulo and Bitwise explanations
 */
export const checkEvenOdd = (numStr) => {
  const n = BigInt(numStr);
  const isZero = n === 0n;
  const isNegative = n < 0n;
  const absN = n < 0n ? -n : n;
  const remainder = absN % 2n;
  const isEven = remainder === 0n;

  // Binary representation for bitwise LSB check
  const binStr = absN.toString(2);
  const lsb = binStr[binStr.length - 1];

  const steps = [
    {
      method: '1. Modulo Arithmetic (n % 2)',
      formula: `${numStr} mod 2 = ${remainder.toString()}`,
      result: isEven ? 'Remainder is 0 ➔ EVEN' : 'Remainder is 1 ➔ ODD',
      explanation: isEven
        ? `${numStr} is divisible by 2 with no remainder. Any integer n where n % 2 == 0 is Even.`
        : `${numStr} leaves a remainder of 1 when divided by 2. Any integer n where |n| % 2 == 1 is Odd.`
    },
    {
      method: '2. C++ / Bitwise LSB Check (n & 1)',
      formula: `Binary: ...${lsb}₂  ➔  (${numStr} & 1) = ${lsb}`,
      result: lsb === '0' ? 'LSB is 0 ➔ EVEN' : 'LSB is 1 ➔ ODD',
      explanation: `In computers and C++, the parity of an integer is determined exclusively by its Least Significant Bit (LSB / 2⁰ place). If LSB is 0, the number is even; if 1, it is odd. (Bitwise operation: (n & 1) == 0)`
    },
    {
      method: '3. Algebraic Definition',
      formula: isEven ? `${numStr} = 2 × (${(n / 2n).toString()})` : `${numStr} = 2 × (${(n / 2n).toString()}) + ${(n >= 0n ? 1 : -1)}`,
      result: isEven ? 'Form: 2k' : 'Form: 2k + 1',
      explanation: isEven
        ? `Can be written in the form 2k, where k is an integer (${(n / 2n).toString()}).`
        : `Can be written in the form 2k + 1, where k is an integer.`
    }
  ];

  return {
    num: numStr,
    isEven,
    isZero,
    isNegative,
    title: isZero 
      ? `0 is an EVEN Number` 
      : `${numStr} is an ${isEven ? 'EVEN' : 'ODD'} Number`,
    statusClass: isEven ? 'even' : 'odd',
    remainder: remainder.toString(),
    lsb,
    binary: binStr,
    steps,
    summary: `${numStr} is ${isEven ? 'EVEN' : 'ODD'} because ${numStr} mod 2 = ${remainder.toString()} and its binary Least Significant Bit is '${lsb}'.`
  };
};

/**
 * All-In-One Multi-Base Representation
 */
export const getNumberRepresentations = (decimalStr) => {
  const n = BigInt(decimalStr);
  const binary = n.toString(2);
  const octal = n.toString(8);
  const hex = n.toString(16).toUpperCase();

  const bitLength = binary.length;
  const bytePadded8 = padBinaryToWidth(binary, 8);
  const bytePadded16 = padBinaryToWidth(binary, 16);
  const bytePadded32 = padBinaryToWidth(binary, 32);

  return {
    decimal: {
      raw: decimalStr,
      formatted: formatWithBase(decimalStr, 10),
      radix: 10,
      name: 'Decimal'
    },
    binary: {
      raw: binary,
      formatted: formatWithBase(binary, 2),
      grouped4: groupBinary(binary, 4),
      grouped8: groupBinary(bytePadded8, 8),
      radix: 2,
      name: 'Binary',
      bitLength,
      bytePadded8,
      bytePadded16,
      bytePadded32
    },
    octal: {
      raw: octal,
      formatted: formatWithBase(octal, 8),
      prefixed: `0${octal}`,
      radix: 8,
      name: 'Octal'
    },
    hexadecimal: {
      raw: hex,
      formatted: formatWithBase(hex, 16),
      prefixed: `0x${hex}`,
      radix: 16,
      name: 'Hexadecimal'
    },
    meta: {
      bitsNeeded: bitLength,
      bytesNeeded: Math.ceil(bitLength / 8),
      nibblesNeeded: Math.ceil(bitLength / 4)
    }
  };
};
