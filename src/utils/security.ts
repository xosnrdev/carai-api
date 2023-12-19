/**
 * Checks if the provided code contains patterns that might indicate a script injection attempt.
 *
 * @param {string} code - The source code to be executed.
 * @returns {boolean} - `true` if script injection patterns are detected, `false` otherwise.
 */
function isScriptInjectionAttempt(code: string): boolean {
  // List of modules or patterns that are considered dangerous
  const dangerousModules = ["fs", "child_process"];
  const pattern = new RegExp(
    `require\\(('|"|\`)(${dangerousModules.join("|")})('|"|\`)\\)`,
    "i"
  );

  return pattern.test(code);
}

export default isScriptInjectionAttempt;
