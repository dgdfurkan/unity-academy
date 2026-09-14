import type { Role, User } from "./types";

/**
 * Tarayıcı belleğindeki geçici depo. Parolalar açık duruyor, bu bir güvenlik
 * katmanı değil: akışı çalıştırmak için var. Firebase bağlanınca silinecek.
 */
const USERS_KEY = "ua.users.v3";

export const USERNAME_PATTERN = /^[a-z][a-z0-9_]{2,19}$/;

export type StoredUser = User & { password: string };

/** Hazır duran deneme hesapları. Tasarımı dolu haliyle görebilmek için. */
export const DEMO_ACCOUNTS = {
  student: { username: "demo", password: "demo1234" },
  instructor: { username: "admin", password: "admin1234" },
} as const;

const SEED: StoredUser[] = [
  {
    id: "seed-instructor",
    name: "Furkan Gündüz",
    username: DEMO_ACCOUNTS.instructor.username,
    email: "egitmen@unityacademy.dev",
    role: "instructor",
    createdAt: "2026-01-06T09:00:00.000Z",
    password: DEMO_ACCOUNTS.instructor.password,
  },
  {
    id: "seed-student",
    name: "Deniz Kaya",
    username: DEMO_ACCOUNTS.student.username,
    email: "deniz@ornek.com",
    role: "student",
    createdAt: "2026-02-11T09:00:00.000Z",
    password: DEMO_ACCOUNTS.student.password,
  },
];

export function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const users = raw ? (JSON.parse(raw) as StoredUser[]) : [];
    // Deneme hesapları her zaman bulunur, depo temizlense bile.
    const missing = SEED.filter((s) => !users.some((u) => u.username === s.username));
    return [...missing, ...users];
  } catch {
    return SEED;
  }
}

export function writeUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // Gizli sekmede yazma engellenebilir, kayıt yalnızca bu sekmede yaşar.
  }
}

export function publicUser({ password: _password, ...user }: StoredUser): User {
  return user;
}

export function usersByRole(role: Role): User[] {
  return readUsers()
    .filter((u) => u.role === role)
    .map(publicUser);
}
