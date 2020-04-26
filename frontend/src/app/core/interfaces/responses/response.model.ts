export interface APIResponse {
  error?: {
    level?: string,
    message?: string
  };
  response?: {
    id?: number,
    title?: string,
    info?: string,
    done?: boolean
  };
}

export interface APIListResponse {
  error?: {
    level?: string,
    message?: string
  };
  response?: any[]
}
