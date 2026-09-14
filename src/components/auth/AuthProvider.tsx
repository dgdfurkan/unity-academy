"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { auth, type User } from "@/lib/auth";

type AuthState = {
  user: User | null;
  /** İlk okuma bitene kadar true. Yanlış ekranı bir kare göstermemek için. */
  loading: boolean;
};

const AuthContext = createContext<AuthState>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => auth.subscribe((user) => setState({ user, loading: false })), []);

  const value = useMemo(() => state, [state]);
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  return useContext(AuthContext);
}
