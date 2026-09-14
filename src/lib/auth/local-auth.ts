import { publicUser, readUsers } from "./store";
import { AuthError, type AuthClient, type User } from "./types";

const SESSION_KEY = "ua.session";

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

  async signIn(username: string, password: string): Promise<User> {
    const normalized = username.trim().toLowerCase();
    const found = readUsers().find((u) => u.username === normalized && u.password === password);
    if (!found) throw new AuthError("wrongCredentials");
    const user = publicUser(found);
    this.#setUser(user);
    return user;
  }

  async signOut(): Promise<void> {
    this.#setUser(null);
  }
}
