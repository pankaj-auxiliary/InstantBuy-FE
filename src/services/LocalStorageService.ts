export const AUTH_TOKEN = "authToken";
export const AVAILAVLE_MFA_METHOD = "availabe_mfa_method";
export const DEFAULT_MFA_METHOD = "default_mfa_method";
export class LocalStorageService {
  private static _instance: LocalStorageService;

  static getInstance(): LocalStorageService {
    if (!this._instance) {
      this._instance = new LocalStorageService();
    }

    return this._instance;
  }

  setLocalStorageValue(key: string, value: string): void {
    if (typeof localStorage !== "undefined") {
      localStorage?.setItem(key, value);
    }
  }

  getLocalStorageValue(key: string): string | null {
    if (typeof localStorage !== "undefined") {
      return localStorage?.getItem(key);
    }
    return null;
  }

  removeLocalStorageValue(key: string): void {
    if (typeof localStorage !== "undefined") {
      localStorage?.removeItem(key);
    }
  }

  setSessionStorageValue(key: string, value: string): void {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage?.setItem(key, value);
    }
  }

  getSessionStorageValue(key: string): string | null {
    if (typeof sessionStorage !== "undefined") {
      return sessionStorage?.getItem(key);
    }
    return null;
  }

  removeSessionStorageValue(key: string): void {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage?.removeItem(key);
    }
  }

  setAuthToken(token: string): void {
    this.setLocalStorageValue(AUTH_TOKEN, token);
  }

  getAuthToken(): string | null {
    return this.getLocalStorageValue(AUTH_TOKEN);
  }

  removeAuthToken(): void {
    this.removeLocalStorageValue(AUTH_TOKEN);
  }

  setAvailableMfaMethods(methods: string[]): void {
    this.setSessionStorageValue(AVAILAVLE_MFA_METHOD, JSON.stringify(methods));
  }

  getAvailableMfaMethods(): string[] {
    const methods = this.getSessionStorageValue(AVAILAVLE_MFA_METHOD);
    return methods ? JSON.parse(methods) : [];
  }

  removeAvailableMfaMethods(): void {
    this.removeSessionStorageValue(AVAILAVLE_MFA_METHOD);
  }

  setDefaultMfaMethod(method: string): void {
    this.setSessionStorageValue(DEFAULT_MFA_METHOD, method);
  }

  getDefaultMfaMethod(): string | null {
    return this.getSessionStorageValue(DEFAULT_MFA_METHOD);
  }

  removeDefaultMfaMethod(): void {
    this.removeSessionStorageValue(DEFAULT_MFA_METHOD);
  }
}

export const localStorageService = LocalStorageService.getInstance();
