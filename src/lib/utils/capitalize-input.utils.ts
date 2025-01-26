/**
 * Capitalize the first letter of each word in a given string.
 *
 * @param {string} text - The string to capitalize.
 * @returns {string} The capitalized string.
 *
 * @example
 * capitalize('hello world') // 'Hello World'
 */
export function capitalize(text: string): string {
  return text.replace(/\b\w/g, m => m.toUpperCase());
}
