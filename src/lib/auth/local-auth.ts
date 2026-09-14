import { AuthError, type AuthClient, type User } from "./types";

/**
 * Tarayıcı belleğinde çalışan geçici uygulama. Akışı görebilmek için var,
 * güvenlik sağlamaz: parola karşılaştırması da veri saklama da istemci tarafında.
 * Firebase bağlandığında bu dosya silinir.
 */
const USERS_KEY = "ua.users";
const SESSION_KEY = "ua.session";

type StoredUser = User & { password: string };

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // Gizli sekmede yazma engellenebilir, oturum yalnızca bu sekmede yaşar.
  }
}

function publicUser({ password: _password, ...user }: StoredUser): User {
  return user;
}

export class LocalAuth implements AuthClient {
  #listeners = new Set<(user: User | null) => void>();
  #user: User | null = null;
  #hydrated = false;

  #hydrate() {
    if (this.#hydrated || typeof window === "undefined") return;
    this.#hydrated = true;
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      this.#user = raw ? (JSON.parse(raw) as User) : null;
    } catch {
      this.#user = null;
    }
  }

  #setUser(user: User | null) {
    this.#user = user;
    try {
      if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      else localStorage.removeItem(SESSION_KEY);
    } catch {
      // yazma engellendi, bellekteki durum geçerli kalır
    }
    for (const listener of this.#listeners) listener(user);
  }

  current(): User | null {
    this.#hydrate();
    return this.#user;
  }

  subscribe(listener: (user: User | null) => void): () => void {
    this.#hydrate();
    this.#listeners.add(listener);
    listener(this.#user);
    return () => this.#listeners.delete(listener);
  }

  async signIn(email: string, password: string): Promise<User> {
    const normalized = email.trim().toLowerCase();
    const found = readUsers().find(
      (u) => u.email === normalized && u.password === password,
    );
    if (!found) throw new AuthError("wrongCredentials");
    const user = publicUser(found);
    this.#setUser(user);
    return user;
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    const normalized = email.trim().toLowerCase();
    const users = readUsers();
    if (users.some((u) => u.email === normalized)) throw new AuthError("emailTaken");

    const stored: StoredUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalized,
      role: "student",
      password,
    };
    writeUsers([...users, stored]);
    const user = publicUser(stored);
    this.#setUser(user);
    return user;
  }

  async signOut(): Promise<void> {
    this.#setUser(null);
  }
}
