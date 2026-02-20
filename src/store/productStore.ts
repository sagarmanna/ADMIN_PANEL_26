import { create } from "zustand";
import { api } from "@/lib/axios";

type Product = any;
type CacheKey = string;

type ProductsState = {
  list: Product[];
  total: number;
  loading: boolean;
  error: string | null;

  categories: string[];
  categoriesLoading: boolean;

  cache: Record<CacheKey, { list: Product[]; total: number; ts: number }>;

  fetchCategories: () => Promise<void>;
  fetchProducts: (args: { skip: number; limit: number; q?: string; category?: string }) => Promise<void>;
  fetchProductById: (id: string) => Promise<Product>;
};

const TTL = 60_000;

export const useProductStore = create<ProductsState>((set, get) => ({
  list: [],
  total: 0,
  loading: false,
  error: null,
  categories: [],
  categoriesLoading: false,
  cache: {},

  fetchCategories: async () => {
    if (get().categories.length) return;
    set({ categoriesLoading: true });
    try {
      const { data } = await api.get("/products/category-list");
      set({ categories: data ?? [], categoriesLoading: false });
    } catch {
      set({ categoriesLoading: false });
    }
  },

  fetchProducts: async ({ skip, limit, q, category }) => {
    const key: CacheKey = `products:${skip}:${limit}:${q || ""}:${category || ""}`;
    const cached = get().cache[key];
    if (cached && Date.now() - cached.ts < TTL) {
      set({ list: cached.list, total: cached.total, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      let url = "/products";
      let params: any = { limit, skip };

      if (category) {
        url = `/products/category/${category}`;
        params = { limit, skip };
      } else if (q?.trim()) {
        url = "/products/search";
        params = { q, limit, skip };
      }

      const { data } = await api.get(url, { params });
      const list = data?.products ?? [];
      const total = data?.total ?? 0;

      set((s) => ({
        list,
        total,
        loading: false,
        cache: { ...s.cache, [key]: { list, total, ts: Date.now() } },
      }));
    } catch (e: any) {
      set({ loading: false, error: e?.message || "Failed to fetch products" });
    }
  },

  fetchProductById: async (id: string) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
}));