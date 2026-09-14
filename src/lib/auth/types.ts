export type Role = "student" | "instructor";

export interface User {
  id: string;
  name: string;
  /** Giriş bu alanla yapılır. Küçük harfe normalize edilmiş halde saklanır. */
  username: string;
  email: string;
  role: Role;
  /** ISO tarih. Hesabın ne zaman açıldığı. */
  createdAt: string;
}

export type AuthErrorCode = "wrongCredentials" | "usernameTaken" | "emailTaken";

export class AuthError extends Error {
  constructor(readonly code: AuthErrorCode) {
    super(code);
    this.name = "AuthError";
  }
}

export type NewStudent = {
  name: string;
  username: string;
  email: string;
  password: string;
};

/**
 * Oturum sözleşmesi. Arayüz yalnızca bunu bilir, arkadaki sağlayıcıyı bilmez.
 * Firebase geldiğinde bu arayüzü uygulayan yeni bir sınıf yazılır ve
 * `src/lib/auth/index.ts` içindeki tek satır değişir.
 *
 * Giriş kullanıcı adıyla yapılıyor. Firebase Authentication kullanıcı adını
 * doğrudan desteklemiyor: oradaki uygulama önce kullanıcı adını hesaba çözecek,
 * çağıran taraf değişmeyecek.
 */
export interface AuthClient {
  signIn(username: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  /** Anlık kullanıcı. Sunucuda ve ilk boyamada null döner. */
  current(): User | null;
  /** Değişiklikleri dinler, aboneliği bitiren fonksiyonu döner. */
  subscribe(listener: (user: User | null) => void): () => void;
}

/**
 * Öğrenci listesi. Hesapları yalnızca eğitmen açar, öğrenci kendi kaydını
 * oluşturamaz. Gerçek yetki kontrolü Firebase Security Rules ile yapılacak;
 * buradaki ayrım arayüz seviyesinde.
 */
export interface StudentDirectory {
  list(): User[];
  create(input: NewStudent): Promise<User>;
}
