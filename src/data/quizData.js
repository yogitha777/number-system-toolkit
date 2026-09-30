/**
 * Interactive practice questions for testing knowledge
 */
export const PRACTICE_QUESTIONS = [
  {
    id: 1,
    question: 'What is the binary representation of decimal number 13?',
    options: ['1101', '1011', '1110', '1001'],
    correctIndex: 0,
    explanation: '13 = 8 + 4 + 0 + 1 = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 1101₂'
  },
  {
    id: 2,
    question: 'How many binary bits correspond to 1 hexadecimal digit?',
    options: ['2 bits', '3 bits', '4 bits', '8 bits'],
    correctIndex: 2,
    explanation: 'Since 16 = 2⁴, exactly 4 binary bits (one nibble) represent 1 hexadecimal character (0–F).'
  },
  {
    id: 3,
    question: 'What is the decimal value of the hexadecimal number "1A"?',
    options: ['24', '26', '28', '16'],
    correctIndex: 1,
    explanation: '1A₁₆ = (1 × 16¹) + (10 × 16⁰) = 16 + 10 = 26₁₀'
  },
  {
    id: 4,
    question: 'Which of the following is the only EVEN prime number?',
    options: ['0', '1', '2', '4'],
    correctIndex: 2,
    explanation: '2 is the only even prime number because all other even numbers are divisible by 2.'
  },
  {
    id: 5,
    question: 'In C++, which bitwise operation checks if an integer n is odd?',
    options: ['(n & 1) == 1', '(n | 1) == 1', '(n ^ 1) == 0', '(n >> 1) == 1'],
    correctIndex: 0,
    explanation: 'The Least Significant Bit (LSB) indicates parity. If (n & 1) == 1, the number is odd; if 0, even.'
  },
  {
    id: 6,
    question: 'Convert binary 110101₂ to octal by grouping 3 bits:',
    options: ['65₈', '56₈', '35₈', '71₈'],
    correctIndex: 0,
    explanation: 'Group into sets of 3 from right: (110) (101) = 6 5 = 65₈.'
  }
];
