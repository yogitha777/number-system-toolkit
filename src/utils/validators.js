/**
 * Input validators for number systems
 */

export const validateInput = (value, system) => {
  if (value === undefined || value === null || value.trim() === '') {
    return { isValid: false, error: 'Please enter a number to convert.' };
  }

  const clean = value.trim();

  switch (system) {
    case 'decimal': {
      // Must be non-negative integer (can support 0 and positive numbers)
      if (!/^\d+$/.test(clean)) {
        return {
          isValid: false,
          error: 'Invalid decimal number. Only digits (0-9) are allowed without signs or decimals.'
        };
      }
      return { isValid: true, cleanValue: clean };
    }

    case 'binary': {
      // Must contain only 0 and 1
      if (!/^[01]+$/.test(clean)) {
        return {
          isValid: false,
          error: 'Invalid binary number. Binary only allows digits 0 and 1.'
        };
      }
      return { isValid: true, cleanValue: clean };
    }

    case 'octal': {
      // Must contain only 0 to 7
      if (!/^[0-7]+$/.test(clean)) {
        return {
          isValid: false,
          error: 'Invalid octal number. Octal only allows digits 0 through 7 (base 8).'
        };
      }
      return { isValid: true, cleanValue: clean };
    }

    case 'hexadecimal': {
      // Must contain only 0-9 and A-F (case insensitive)
      const upper = clean.toUpperCase().replace(/^0X/, '');
      if (upper === '' || !/^[0-9A-F]+$/.test(upper)) {
        return {
          isValid: false,
          error: 'Invalid hexadecimal number. Only digits 0-9 and letters A-F are allowed.'
        };
      }
      return { isValid: true, cleanValue: upper };
    }

    case 'integer': {
      // Allows optional negative for prime/even-odd checks, though operations can specify domain
      if (!/^-?\d+$/.test(clean)) {
        return {
          isValid: false,
          error: 'Please enter a valid whole integer (e.g. 0, 7, 42).'
        };
      }
      return { isValid: true, cleanValue: clean };
    }

    default:
      return { isValid: true, cleanValue: clean };
  }
};
