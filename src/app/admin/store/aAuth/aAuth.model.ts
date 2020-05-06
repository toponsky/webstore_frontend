export interface aAuth  {
  email: string;
  password: string;
}

export interface aAuthStatus {
  token: string;
  loading: boolean;
  error: Error;
}

export interface aAuthState {
  readonly aAuth: aAuthStatus
}
