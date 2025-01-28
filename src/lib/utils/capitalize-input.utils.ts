/**
 * Transforma a primeira letra de cada palavra de uma string em maiúscula
 *
 * @param {string} text - string a ser transformada.
 * @returns {string} string transformada.
 *
 * @example
 * capitalize('hello world') // 'Hello World'
 */
export function capitalize(text: string): string {
  return text.replace(/\b\w/g, m => m.toUpperCase());
}
