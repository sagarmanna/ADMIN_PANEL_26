import { create } from "zustand";
import { api } from "@/lib/axios";

type User = any;

type CacheKey = string;

type UsersState = {
  list: User[];
  total: number;
  loading: boolean;
  error: string | null;

  cache: Record<CacheKey, { list: User[]; total: number; ts: number }>;

  fetchUsers: (args: { skip: number; limit: number; q?: string }) => Promise<void>;
  fetchUserById: (id: string) => Promise<User>;
};

const TTL = 60_000; // 1 min caching

export const useUserStore = create<UsersState>((set, get) => ({
  list: [],
  total: 0,
  loading: false,
  error: null,
  cache: {},

  fetchUsers: async ({ skip, limit, q }) => {
    const key: CacheKey = `users:${skip}:${limit}:${q || ""}`;
    const cached = get().cache[key];
    if (cached && Date.now() - cached.ts < TTL) {
      set({ list: cached.list, total: cached.total, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const url = q?.trim() ? "/users/search" : "/users";
      const { data } = await api.get(url, {
        params: q?.trim() ? { q, limit, skip } : { limit, skip },
      });

      const list = data?.users ?? [];
      const total = data?.total ?? 0;

      set((s) => ({
        list,
        total,
        loading: false,
        cache: { ...s.cache, [key]: { list, total, ts: Date.now() } },
      }));
    } catch (e: any) {
      set({ loading: false, error: e?.message || "Failed to fetch users" });
    }
  },

  fetchUserById: async (id: string) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },
}));