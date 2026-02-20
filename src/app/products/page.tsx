"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import ProductGrid from "@/components/ProductGrid";
import { useProductStore } from "@/store/productStore";
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function ProductsPage() {
  const {
    list,
    total,
    loading,
    error,
    categories,
    fetchCategories,
    fetchProducts,
  } = useProductStore();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const pages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total]);

  const load = useCallback(async () => {
    const skip = (page - 1) * limit;
    await fetchProducts({
      skip,
      limit,
      q: q.trim() || undefined,
      category: category || undefined,
    });
  }, [fetchProducts, page, q, category]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Layout>
      <Stack spacing={2}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={800}>Products</Typography>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Search products"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {error && <Alert severity="error">{error}</Alert>}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ProductGrid products={list} />
        )}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination count={pages} page={page} onChange={(_, v) => setPage(v)} />
        </Box>
      </Stack>
    </Layout>
  );
}