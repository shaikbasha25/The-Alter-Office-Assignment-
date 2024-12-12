export interface AuthError {
  code: string;
  message: string;
  customData?: Record<string, unknown>;
  name?: string;
}