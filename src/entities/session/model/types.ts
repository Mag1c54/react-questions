export interface UserPermission {
  id: number;
  name: string;
}

export interface UserRole {
  id: number;
  name: string;
  permissions: UserPermission[];
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string | null;
  isVerified: boolean;
  userRoles?: UserRole[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
}

export interface AuthResponse extends TokenResponse {
  user: AuthUser;
}

export type SessionStatus = "checking" | "authenticated" | "guest";

export interface SessionState {
  accessToken: string | null;
  status: SessionStatus;
}
