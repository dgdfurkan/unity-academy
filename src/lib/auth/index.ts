import { LocalAuth } from "./local-auth";
import type { AuthClient } from "./types";

/** Sağlayıcıyı değiştirmek için değişecek tek satır. */
export const auth: AuthClient = new LocalAuth();

export * from "./types";
