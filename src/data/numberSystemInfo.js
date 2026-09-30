/**
 * Comprehensive educational information about number systems,
 * bases/radixes, digits, computer architectures, and C++/DSA relevance.
 */

export const NUMBER_SYSTEMS_INFO = [
  {
    id: 'decimal',
    name: 'Decimal Number System',
    base: 10,
    radix: 'Base 10',
    digits: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
    symbolCount: 10,
    prefixNotation: 'None / subscript ₁₀',
    cppLiteral: 'int x = 42;',
    history: 'Originated in ancient India (Hindu-Arabic numeral system), popularized universally because humans have 10 fingers (ten digits on two hands).',
    howItWorks: 'Positional weight increases by powers of 10 from right to left: 10⁰ (units), 10¹ (tens), 10² (hundreds), 10³ (thousands), etc.',
    formula: 'N = dₙ·10ⁿ + ... + d₁·10¹ + d₀·10⁰',
    applications: [
      'Universal human commerce, financial ledgers, and everyday arithmetic.',
      'Default input/output format for user-facing software applications.',
      'Metric measurement standards (meters, kilograms, liters).'
    ],
    csConnection: 'While humans naturally think in base 10, digital computers cannot store base-10 states directly on silicon transistors efficiently, requiring conversion to binary.'
  },
  {
    id: 'binary',
    name: 'Binary Number System',
    base: 2,
    radix: 'Base 2',
    digits: '0, 1',
    symbolCount: 2,
    prefixNotation: '0b prefix (e.g., 0b1011) or subscript ₂',
    cppLiteral: 'int mask = 0b1101; // C++14 binary literal',
    history: 'Formalized by Gottfried Wilhelm Leibniz in 1679 and later combined with Boolean algebra by George Boole in 1854.',
    howItWorks: 'Each position represents a power of 2: 2⁰ (1), 2¹ (2), 2² (4), 2³ (8), 2⁴ (16), 2⁵ (32), 2⁶ (64), 2⁷ (128).',
    formula: 'N = bₙ·2ⁿ + ... + b₁·2¹ + b₀·2⁰',
    applications: [
      'Digital electronics: Silicon MOSFET transistors operate as electronic switches with two states (High Voltage = 1, Low Voltage = 0).',
      'Machine code and CPU microcode: All instruction opcodes, registers, and memory words are pure binary bitstreams.',
      'Data communications: High-speed optical pulses (light on/off) and radio frequency modulations.',
      'Error detection and correction codes (Hamming codes, CRC parity bits).'
    ],
    csConnection: 'The fundamental unit of information in computer science is the BIT (Binary digIT). 8 bits form 1 Byte (octet), capable of representing 2⁸ = 256 unique combinations.'
  },
  {
    id: 'octal',
    name: 'Octal Number System',
    base: 8,
    radix: 'Base 8',
    digits: '0, 1, 2, 3, 4, 5, 6, 7',
    symbolCount: 8,
    prefixNotation: '0 prefix in C/C++ (e.g., 0755) or subscript ₈',
    cppLiteral: 'int perms = 0755; // leading 0 indicates octal',
    history: 'Historically used extensively in early computing (such as DEC PDP-8, PDP-11, and IBM mainframe systems) whose architecture featured word lengths that were multiples of 3 bits (12-bit, 24-bit, 36-bit words).',
    howItWorks: 'Each octal digit maps cleanly to exactly 3 binary bits (2³ = 8). Positional weights: 8⁰ (1), 8¹ (8), 8² (64), 8³ (512).',
    formula: 'N = oₙ·8ⁿ + ... + o₁·8¹ + o₀·8⁰',
    applications: [
      'UNIX/Linux file permissions: `chmod 755 filename` where 7 = rwx (111₂), 5 = r-x (101₂).',
      'Early aviation transponder codes (Squawk codes: 7700 emergency, 7600 radio failure, 7500 hijack).',
      'Compact representation of 3-bit machine registers in legacy minicomputers.'
    ],
    csConnection: 'Be careful in C and C++! A number starting with a leading zero like `int x = 012;` is interpreted as octal (decimal 10), not decimal 12!'
  },
  {
    id: 'hexadecimal',
    name: 'Hexadecimal Number System',
    base: 16,
    radix: 'Base 16',
    digits: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F',
    symbolCount: 16,
    prefixNotation: '0x or 0X prefix (e.g., 0xFF, 0x1A) or subscript ₁₆',
    cppLiteral: 'uint32_t addr = 0x7FFEED20; // 0x prefix',
    history: 'Introduced by IBM in 1963 with the System/360 architecture to provide a concise, human-readable shorthand for 8-bit bytes and 32-bit words.',
    howItWorks: 'Each hexadecimal digit maps directly to exactly 4 binary bits (a "nibble", 2⁴ = 16). Positional weights: 16⁰ (1), 16¹ (16), 16² (256), 16³ (4096). Letters A–F correspond to values 10 through 15.',
    formula: 'N = hₙ·16ⁿ + ... + h₁·16¹ + h₀·16⁰',
    applications: [
      'RAM memory addresses in debuggers (GDB, Visual Studio) and operating system pointers (e.g., `0x00401000`).',
      'Web and UI color hex codes: `#FF5733` (Red: FF=255, Green: 57=87, Blue: 33=51).',
      'MAC addresses of network hardware interfaces: `00:1A:2B:3C:4D:5E`.',
      'IPv6 addresses: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`.',
      'Cryptographic hashes (SHA-256, MD5) and byte hex dumps.'
    ],
    csConnection: 'One byte (8 bits) is represented by exactly 2 hexadecimal characters (0x00 to 0xFF). This 1-to-1 fit makes hex the undisputed king of systems programming and DSA.'
  }
];

export const RADIX_COMPARISON_TABLE = [
  { dec: 0, bin: '0000', oct: '0', hex: '0' },
  { dec: 1, bin: '0001', oct: '1', hex: '1' },
  { dec: 2, bin: '0010', oct: '2', hex: '2' },
  { dec: 3, bin: '0011', oct: '3', hex: '3' },
  { dec: 4, bin: '0100', oct: '4', hex: '4' },
  { dec: 5, bin: '0101', oct: '5', hex: '5' },
  { dec: 6, bin: '0110', oct: '6', hex: '6' },
  { dec: 7, bin: '0111', oct: '7', hex: '7' },
  { dec: 8, bin: '1000', oct: '10', hex: '8' },
  { dec: 9, bin: '1001', oct: '11', hex: '9' },
  { dec: 10, bin: '1010', oct: '12', hex: 'A' },
  { dec: 11, bin: '1011', oct: '13', hex: 'B' },
  { dec: 12, bin: '1100', oct: '14', hex: 'C' },
  { dec: 13, bin: '1101', oct: '15', hex: 'D' },
  { dec: 14, bin: '1110', oct: '16', hex: 'E' },
  { dec: 15, bin: '1111', oct: '17', hex: 'F' },
  { dec: 16, bin: '10000', oct: '20', hex: '10' }
];

export const CPP_DSA_INSIGHTS = [
  {
    title: 'Bitwise Operators in C++',
    description: 'Direct manipulation of bits is fundamental for high-performance DSA algorithms and system code.',
    code: `// C++ Bitwise Operations
int a = 5;      // binary: 0101
int b = 3;      // binary: 0011

int and_res = a & b;  // Bitwise AND: 0001 (1)
int or_res  = a | b;  // Bitwise OR:  0111 (7)
int xor_res = a ^ b;  // Bitwise XOR: 0110 (6)
int not_res = ~a;     // Bitwise NOT (2's complement inversion)
int lshift  = a << 1; // Left shift:  1010 (10) -> multiplies by 2
int rshift  = a >> 1; // Right shift: 0010 (2)  -> divides by 2`
  },
  {
    title: 'Fast Parity Check (Even / Odd) in C++',
    description: 'Checking the Least Significant Bit (LSB) with bitwise AND is typically faster than the division-based modulo operator.',
    code: `// Standard Modulo vs Bitwise AND
bool isEven_modulo(int n) {
    return (n % 2) == 0;
}

// Bitwise optimization in C++ DSA:
bool isEven_bitwise(int n) {
    return !(n & 1); // 0 means even, 1 means odd
}`
  },
  {
    title: 'C++ Modern I/O Manipulators for Number Systems',
    description: 'C++ standard library `<iostream>` and `<iomanip>` provide stream manipulators to format integers in different bases directly.',
    code: `#include <iostream>
#include <bitset>
#include <iomanip>

int main() {
    int num = 254;

    std::cout << "Decimal:     " << std::dec << num << "\\n";
    std::cout << "Hexadecimal: 0x" << std::hex << std::uppercase << num << "\\n";
    std::cout << "Octal:       0" << std::oct << num << "\\n";
    std::cout << "Binary:      " << std::bitset<8>(num) << "\\n";
    return 0;
}`
  }
];
