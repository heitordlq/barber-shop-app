import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Tenant {
  id: string;
  slug: string;
  name: string;
  status: string;
  stripeOnboardingComplete?: boolean;
}

interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  login: (user: User, tenant: Tenant, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  updateTenant: (tenant: Partial<Tenant>) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tenant: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      _hasHydrated: false,

      login: (user, tenant, accessToken, refreshToken) =>
        set({ user, tenant, accessToken, refreshToken, isAuthenticated: true }),

      logout: () =>
        set({ user: null, tenant: null, accessToken: null, refreshToken: null, isAuthenticated: false }),

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      updateTenant: (tenant) =>
        set((state) => ({
          tenant: state.tenant ? { ...state.tenant, ...tenant } : null,
        })),

      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "barbershop-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
