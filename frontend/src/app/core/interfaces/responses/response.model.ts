export interface APIResponse {
  error?: {
    level?: string,
    message?: string
  };
  response?: {
    ID?: string
  };
}
