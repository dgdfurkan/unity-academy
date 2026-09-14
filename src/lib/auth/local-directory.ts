import { publicUser, readUsers, usersByRole, writeUsers, type StoredUser } from "./store";
import { AuthError, type NewStudent, type StudentDirectory, type User } from "./types";

export class LocalDirectory implements StudentDirectory {
  list(): User[] {
    return usersByRole("student").sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async create({ name, username, email, password }: NewStudent): Promise<User> {
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();
    const users = readUsers();

    if (users.some((u) => u.username === normalizedUsername)) {
      throw new AuthError("usernameTaken");
    }
    if (users.some((u) => u.email === normalizedEmail)) {
      throw new AuthError("emailTaken");
    }

    const stored: StoredUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      username: normalizedUsername,
      email: normalizedEmail,
      role: "student",
      createdAt: new Date().toISOString(),
      password,
    };
    writeUsers([...users, stored]);
    return publicUser(stored);
  }
}
