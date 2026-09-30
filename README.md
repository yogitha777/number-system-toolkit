# Number System Toolkit 

> **An Educational C++ / DSA-Focused Web Application for Learning and Converting Number Systems Interactively.**

---

##  Project Overview

**Number System Toolkit** is an interactive, beginner-friendly educational web application built for students, teachers, and developers to explore, convert, and master number systems. Unlike simple calculators that display only raw answers, this toolkit emphasizes **pedagogical clarity**, breaking down every mathematical step with division tables, positional expansions, bit-grouping visualizations, and real-world C++/DSA connections.

---

##  Features & Modules

### 1. Conversions Engine (10 Core Conversion Modes)
1. **Decimal to Binary**: Repeated division by 2 with quotient and remainder table, showing bottom-to-top remainder readout.
2. **Binary to Decimal**: Positional weight expansion ($d \times 2^i$), intermediate powers, and summation.
3. **Decimal to Octal**: Repeated division by 8 with quotient and remainder table.
4. **Octal to Decimal**: Positional weight expansion ($d \times 8^i$) and summation.
5. **Decimal to Hexadecimal**: Repeated division by 16 with letter mapping ($10 \to A, \dots, 15 \to F$).
6. **Hexadecimal to Decimal**: Positional weight expansion ($d \times 16^i$) with letter value breakdowns.
7. **Binary to Octal**: Direct 3-bit grouping from right-to-left, leading zero padding, and per-group value calculations ($4 \times b_2 + 2 \times b_1 + 1 \times b_0$).
8. **Octal to Binary**: Direct expansion of each octal digit into its 3-bit binary equivalent.
9. **Binary to Hexadecimal**: Direct 4-bit nibble grouping from right-to-left, zero padding, and conversion to hex digits (0–9, A–F).
10. **Hexadecimal to Binary**: Direct expansion of each hex digit into its 4-bit binary nibble equivalent.

### 2. Number Operations
- **Prime Number Checker**:
  - Validates integers.
  - Explains edge cases: negatives, $0$, $1$ (not prime), $2$ (only even prime).
  - Efficient trial division up to $\lfloor\sqrt{n}\rfloor$ with an $O(\sqrt{n})$ time complexity explanation and factor log.
- **Even / Odd Parity Checker**:
  - Modulo operation explanation ($n \bmod 2 == 0$).
  - C++ and low-level bitwise parity check using the Least Significant Bit (LSB): `(n & 1) == 0`.
  - Algebraic definition ($2k$ vs $2k+1$).

### 3. Multi-Base Number Representation
- For any decimal input, simultaneously displays:
  - **Decimal** ($_{10}$)
  - **Binary** ($_{2}$) with 4-bit nibbles, 8-bit byte alignment, and active bit count
  - **Octal** ($_{8}$) with `0` prefix
  - **Hexadecimal** ($_{16}$) with `0x` prefix
- **Hardware Register Inspector**: Interactive visual representation of an 8-bit memory byte showing bit lamps (ON/OFF) and individual bit weights ($128, 64, 32, 16, 8, 4, 2, 1$).

### 4. Educational Guide & C++/DSA Insights
- Comprehensive historical background, radix definitions, and allowed digit sets.
- Real-world applications (UNIX `chmod 755`, GDB RAM addresses `0x7fff...`, HTML colors `#FF5733`, IPv6).
- Equivalence reference table from 0 to 16.
- C++ code snippets for bitwise operations (`&`, `|`, `^`, `~`, `<<`, `>>`), stream manipulators (`std::hex`, `std::oct`, `std::bitset`).

### 5. Interactive Practice Quiz
- 6 conceptual multiple-choice questions with instant scoring and detailed step-by-step explanations for self-evaluation.

---

## 📁 Project Structure

```text
number-system-toolkit/
├── public/                     # Static assets and favicon
├── src/
│   ├── components/             # Reusable UI & visualizer components
│   │   ├── Badge.jsx           # Color-coded status and category badges
│   │   ├── BitGroupingView.jsx # 3-bit and 4-bit grouping visualizer
│   │   ├── ConversionCard.jsx  # Main conversion panel & mode switcher
│   │   ├── DigitBreakdownView.jsx # Digit-to-bit expansion visualizer
│   │   ├── DivisionTable.jsx   # Successive division math table
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── PositionalExpansion.jsx # Positional power equation visualizer
│   │   └── StepVisualizer.jsx  # Dynamic pedagogical step orchestrator
│   ├── data/
│   │   ├── numberSystemInfo.js # Educational text, radix tables, C++ code
│   │   └── quizData.js         # Practice questions & explanations
│   ├── pages/                  # Top-level page views
│   │   ├── AboutPage.jsx       # Academic motivation & feature checklist
│   │   ├── ConversionsPage.jsx # 10-mode conversion workbench
│   │   ├── LearnPage.jsx       # Educational textbook & C++ guides
│   │   ├── NumberOperationsPage.jsx # Prime and Even/Odd checkers
│   │   ├── PracticeQuizPage.jsx # Interactive self-test quiz
│   │   └── RepresentationPage.jsx # All-in-one multi-base inspector
│   ├── styles/
│   │   └── index.css           # Modern design system & math styling
│   ├── utils/                  # Core mathematical calculation engines
│   │   ├── conversions.js      # 10 conversion algorithms + step generation
│   │   ├── formatters.js       # Subscripts, grouping, and padding
│   │   ├── operations.js       # Prime, Even/Odd, and multi-base engines
│   │   └── validators.js       # Strict per-system input validation
│   ├── App.jsx                 # Main application component & tab router
│   └── main.jsx                # Application root mount point
├── test_conversions.js         # Automated test suite (all 14 modules tested)
├── index.html                  # HTML entry point with metadata
├── package.json                # Project dependencies and npm scripts
└── vite.config.js              # Vite configuration
```

---

## 🚀 Quickstart & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

### 3. Run Automated Tests
Verify all 14 core mathematical engines, edge cases (0, large numbers, invalid inputs):
```bash
npm test
```

### 4. Build for Production
Generate an optimized static production bundle:
```bash
npm run build
```

---

## 💡 How Key Components Work

1. **`src/utils/conversions.js`**:
   - Implemented using JavaScript native `BigInt` for arbitrary precision arithmetic without 64-bit float precision loss.
   - For division conversions (Decimal $\to$ Base $b$), it generates a step array containing `{ dividend, divisor, quotient, remainder }`, reversing remainders to form the final result.
   - For positional expansions, it calculates $d_i \times b^i$ for each digit from right to left and builds an expanded mathematical formula.
   - For bit grouping ($2 \to 8$ and $2 \to 16$), it handles necessary left-side zero-padding and processes bit clusters directly.

2. **`src/components/StepVisualizer.jsx`**:
   - Inspects the conversion `type` and renders the tailored visualizer: `DivisionTable`, `PositionalExpansion`, `BitGroupingView`, or `DigitBreakdownView`.
   - Explains the input meaning, radix, calculation algorithm, and final answer with correct subscript notation.

3. **`src/utils/operations.js`**:
   - **Prime Checker**: Implements trial division up to $\lfloor\sqrt{n}\rfloor$. Explains why test factors $> \sqrt{n}$ are redundant.
   - **Even/Odd Checker**: Demonstrates both arithmetic modulo ($n \bmod 2$) and bitwise optimization in C++ (`n & 1`), highlighting the binary Least Significant Bit (LSB).

---

## 🔮 Suggestions for Future Enhancements

1. **IEEE-754 Floating-Point Converter**:
   - Add single-precision (32-bit: 1 sign bit, 8 exponent bits, 23 mantissa bits) and double-precision (64-bit) floating point breakdowns.
2. **Two's Complement Signed Integer Visualizer**:
   - Visualize sign bit inversion, 1's complement, and adding 1 for negative numbers in 8-bit, 16-bit, and 32-bit registers.
3. **Interactive Logic Gates Simulator**:
   - Visual breadboard for AND, OR, XOR, NOT, NAND, NOR gates demonstrating binary arithmetic at the hardware logic level.
