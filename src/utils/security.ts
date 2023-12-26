/**
 * Checks if the provided code contains patterns that might indicate a script injection attempt.
 * It looks for direct usage of dangerous modules, globals, functions, and obfuscation attempts.
 * Extensible to include more patterns as new vulnerabilities and techniques are discovered.
 *
 * @param {string} code - The source code to be executed. This should be the raw code input that might be potentially dangerous.
 * @returns {boolean} - Returns `true` if script injection patterns are detected, indicating a potential security risk. Returns `false` if no such patterns are found.
 *
 * @example
 * // returns false for safe code
 * isScriptInjectionAttempt("console.log('Hello World');");
 *
 * @example
 * // returns true for code attempting to require the 'fs' module
 * isScriptInjectionAttempt("const fs = require('fs');");
 */
function isScriptInjectionAttempt(code: string): boolean {
  // List of modules or patterns that are considered dangerous
  const dangerousModules = ["fs", "child_process", "os", "util", "crypto"];
  const dangerousGlobals = ["process", "global", "Buffer"];
  const dangerousFunctions = ["eval", "Function", "exec", "spawn"];

  // Regular expressions to detect usage of dangerous modules, globals, and functions
  const modulePattern = new RegExp(
    `require\\s*\\(('|"|\`)(${dangerousModules.join("|")})('|"|\`)\\)`,
    "i"
  );

  const globalPattern = new RegExp(
    `(${dangerousGlobals.join("|")})\\s*\\.`,
    "i"
  );

  const functionPattern = new RegExp(
    `(${dangerousFunctions.join("|")})\\s*\\(`,
    "i"
  );

  // Regular expression to detect potential obfuscation attempts
  const obfuscationPattern = /(?:\\x[0-9A-Fa-f]{2}|\\u[0-9A-Fa-f]{4})/;

  // Test for direct usage of dangerous modules
  if (modulePattern.test(code)) {
    return true;
  }

  // Test for usage of dangerous globals and functions
  if (globalPattern.test(code) || functionPattern.test(code)) {
    return true;
  }

  // Test for obfuscation attempts
  if (obfuscationPattern.test(code)) {
    return true;
  }

  // Add more checks as necessary

  return false;
}

export default isScriptInjectionAttempt;
