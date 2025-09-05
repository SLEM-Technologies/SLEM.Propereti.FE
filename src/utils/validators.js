export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidEmail(value) {
  if (!isNonEmptyString(value)) return false;
  // Simple RFC5322-like check without being overly strict
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isStrongPassword(value) {
  if (!isNonEmptyString(value)) return false;
  const lengthOk = value.length >= 8;
  const upperOk = /[A-Z]/.test(value);
  const lowerOk = /[a-z]/.test(value);
  const digitOk = /\d/.test(value);
  const symbolOk = /[^A-Za-z0-9]/.test(value);
  return lengthOk && upperOk && lowerOk && digitOk && symbolOk;
}

export function isPhone(value) {
  if (!isNonEmptyString(value)) return false;
  return /^[0-9+\-()\s]{6,}$/.test(value);
}

