import { 
  decimalToBinary, 
  binaryToDecimal, 
  decimalToOctal, 
  octalToDecimal, 
  decimalToHexadecimal, 
  hexadecimalToDecimal, 
  binaryToOctal, 
  octalToBinary, 
  binaryToHexadecimal, 
  hexadecimalToBinary 
} from './src/utils/conversions.js';

import { checkPrime, checkEvenOdd, getNumberRepresentations } from './src/utils/operations.js';
import { validateInput } from './src/utils/validators.js';

console.log('--- TESTING CONVERSIONS ---');

// 1. Decimal to Binary
console.assert(decimalToBinary('13').output === '1101', `Dec2Bin 13 failed: ${decimalToBinary('13').output}`);
console.assert(decimalToBinary('0').output === '0', `Dec2Bin 0 failed: ${decimalToBinary('0').output}`);
console.assert(decimalToBinary('25').output === '11001', `Dec2Bin 25 failed: ${decimalToBinary('25').output}`);
console.log('✓ 1. Decimal to Binary passed');

// 2. Binary to Decimal
console.assert(binaryToDecimal('1101').output === '13', `Bin2Dec 1101 failed: ${binaryToDecimal('1101').output}`);
console.assert(binaryToDecimal('0').output === '0', `Bin2Dec 0 failed`);
console.assert(binaryToDecimal('11001').output === '25', `Bin2Dec 11001 failed`);
console.log('✓ 2. Binary to Decimal passed');

// 3. Decimal to Octal
console.assert(decimalToOctal('65').output === '101', `Dec2Oct 65 failed: ${decimalToOctal('65').output}`);
console.assert(decimalToOctal('0').output === '0', `Dec2Oct 0 failed`);
console.log('✓ 3. Decimal to Octal passed');

// 4. Octal to Decimal
console.assert(octalToDecimal('101').output === '65', `Oct2Dec 101 failed`);
console.assert(octalToDecimal('75').output === '61', `Oct2Dec 75 failed: ${octalToDecimal('75').output}`);
console.log('✓ 4. Octal to Decimal passed');

// 5. Decimal to Hexadecimal
console.assert(decimalToHexadecimal('254').output === 'FE', `Dec2Hex 254 failed: ${decimalToHexadecimal('254').output}`);
console.assert(decimalToHexadecimal('0').output === '0', `Dec2Hex 0 failed`);
console.assert(decimalToHexadecimal('13').output === 'D', `Dec2Hex 13 failed`);
console.log('✓ 5. Decimal to Hexadecimal passed');

// 6. Hexadecimal to Decimal
console.assert(hexadecimalToDecimal('FE').output === '254', `Hex2Dec FE failed`);
console.assert(hexadecimalToDecimal('1A').output === '26', `Hex2Dec 1A failed`);
console.log('✓ 6. Hexadecimal to Decimal passed');

// 7. Binary to Octal
console.assert(binaryToOctal('110101').output === '65', `Bin2Oct 110101 failed: ${binaryToOctal('110101').output}`);
console.assert(binaryToOctal('1101').output === '15', `Bin2Oct 1101 failed: ${binaryToOctal('1101').output}`);
console.assert(binaryToOctal('0').output === '0', `Bin2Oct 0 failed`);
console.log('✓ 7. Binary to Octal passed');

// 8. Octal to Binary
console.assert(octalToBinary('65').output === '110101', `Oct2Bin 65 failed: ${octalToBinary('65').output}`);
console.assert(octalToBinary('0').output === '0', `Oct2Bin 0 failed`);
console.log('✓ 8. Octal to Binary passed');

// 9. Binary to Hexadecimal
console.assert(binaryToHexadecimal('11011110').output === 'DE', `Bin2Hex 11011110 failed: ${binaryToHexadecimal('11011110').output}`);
console.assert(binaryToHexadecimal('1101').output === 'D', `Bin2Hex 1101 failed`);
console.assert(binaryToHexadecimal('0').output === '0', `Bin2Hex 0 failed`);
console.log('✓ 9. Binary to Hexadecimal passed');

// 10. Hexadecimal to Binary
console.assert(hexadecimalToBinary('DE').output === '11011110', `Hex2Bin DE failed: ${hexadecimalToBinary('DE').output}`);
console.assert(hexadecimalToBinary('0').output === '0', `Hex2Bin 0 failed`);
console.log('✓ 10. Hexadecimal to Binary passed');

// 11. Prime Checker
console.assert(!checkPrime('0').isPrime, 'Prime 0 should be false');
console.assert(!checkPrime('1').isPrime, 'Prime 1 should be false');
console.assert(checkPrime('2').isPrime, 'Prime 2 should be true');
console.assert(checkPrime('3').isPrime, 'Prime 3 should be true');
console.assert(!checkPrime('4').isPrime, 'Prime 4 should be false');
console.assert(checkPrime('29').isPrime, 'Prime 29 should be true');
console.assert(checkPrime('97').isPrime, 'Prime 97 should be true');
console.assert(!checkPrime('121').isPrime, 'Prime 121 should be false');
console.log('✓ 11. Prime Checker passed');

// 12. Even/Odd Checker
console.assert(checkEvenOdd('0').isEven, '0 should be even');
console.assert(!checkEvenOdd('1').isEven, '1 should be odd');
console.assert(checkEvenOdd('42').isEven, '42 should be even');
console.assert(!checkEvenOdd('25').isEven, '25 should be odd');
console.log('✓ 12. Even/Odd Checker passed');

// 13. Representation
const reps = getNumberRepresentations('255');
console.assert(reps.binary.raw === '11111111', 'Rep bin 255 failed');
console.assert(reps.octal.raw === '377', 'Rep oct 255 failed');
console.assert(reps.hexadecimal.raw === 'FF', 'Rep hex 255 failed');
console.log('✓ 13. Number Representation passed');

// 14. Validators
console.assert(validateInput('12a', 'decimal').isValid === false, 'Val dec 12a');
console.assert(validateInput('102', 'binary').isValid === false, 'Val bin 102');
console.assert(validateInput('78', 'octal').isValid === false, 'Val oct 78');
console.assert(validateInput('12G', 'hexadecimal').isValid === false, 'Val hex 12G');
console.assert(validateInput('', 'decimal').isValid === false, 'Val empty');
console.assert(validateInput('13', 'decimal').isValid === true, 'Val dec 13');
console.assert(validateInput('1101', 'binary').isValid === true, 'Val bin 1101');
console.assert(validateInput('75', 'octal').isValid === true, 'Val oct 75');
console.assert(validateInput('1A3F', 'hexadecimal').isValid === true, 'Val hex 1A3F');
console.log('✓ 14. Input Validators passed');

console.log('\n ALL TESTS PASSED SUCCESSFULLY! ');
