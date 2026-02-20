"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import UserTable from "@/components/UserTable";
import { useUserStore } from "@/store/userStore";
import {
  Alert,
  Box,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function UsersPage() {
  const { list, total, loading, error, fetchUsers } = useUserStore();

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const pages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total]);

  const load = useCallback(async () => {
    const skip = (page - 1) * limit;
    await fetchUsers({ skip, limit, q: q.trim() || undefined });
  }, [fetchUsers, page, q]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Layout>
      <Stack spacing={2}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={800}>Users</Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Search users (name/email/etc.)"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </Box>
        </Paper>

        {error && <Alert severity="error">{error}</Alert>}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <UserTable users={list} />
        )}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={pages}
            page={page}
            onChange={(_, v) => setPage(v)}
          />
        </Box>
      </Stack>
    </Layout>
  );
}