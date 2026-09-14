export type Role = "student" | "instructor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type AuthErrorCode = "wrongCredentials" | "emailTaken";

export class AuthError extends Error {
  constructor(readonly code: AuthErrorCode) {
    super(code);
    this.name = "AuthError";
  }
}

/**
 * Kimlik doğrulama sözleşmesi. Arayüz yalnızca bunu bilir, hangi sağlayıcının
 * arkada olduğunu bilmez. Firebase geldiğinde bu arayüzü uygulayan yeni bir
 * sınıf yazılır ve `src/lib/auth/index.ts` içindeki tek satır değişir.
 */
export interface AuthClient {
  signIn(email: string, password: string): Promise<User>;
  signUp(name: string, email: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  /** Anlık kullanıcı. Sunucuda ve ilk boyamada null döner. */
  current(): User | null;
  /** Değişiklikleri dinler, aboneliği bitiren fonksiyonu döner. */
  subscribe(listener: (user: User | null) => void): () => void;
}
