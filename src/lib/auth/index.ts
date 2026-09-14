import { LocalAuth } from "./local-auth";
import { LocalDirectory } from "./local-directory";
import type { AuthClient, StudentDirectory } from "./types";

/** Sağlayıcıyı değiştirmek için değişecek iki satır. */
export const auth: AuthClient = new LocalAuth();
export const students: StudentDirectory = new LocalDirectory();

export { DEMO_ACCOUNTS, USERNAME_PATTERN } from "./store";
export * from "./types";
