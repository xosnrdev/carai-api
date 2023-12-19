import Joi from "joi";
import { CodeExecutionRequest } from "../models/code-execution";

/** Schema for code execution request validation */
const schema = Joi.object({
  language: Joi.string().valid("python", "javascript", "typescript").required(),
  code: Joi.string().required(),
});

/**
 * Validate code execution request
 * @param {Record<string, unknown>} body - The request body
 * @returns {{ value: CodeExecutionRequest; error?: Joi.ValidationError }} The validation result
 */
export function validateCodeExecutionRequest(body: Record<string, unknown>): {
  value: CodeExecutionRequest;
  error?: Joi.ValidationError;
} {
  return schema.validate(body);
}
