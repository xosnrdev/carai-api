/**
 * Interface for code execution request
 */
export interface CodeExecutionRequest {
  language: 'python' | 'javascript' | 'typescript';
  code: string;
}
