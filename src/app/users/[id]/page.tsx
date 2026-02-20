"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const { fetchUserById } = useUserStore();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const u = await fetchUserById(params.id);
      setUser(u);
      setLoading(false);
    })();
  }, [fetchUserById, params.id]);

  return (
    <Layout>
      <Paper sx={{ p: 3 }}>
        <Button component={Link} href="/users" variant="text">
          ← Back to Users
        </Button>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={user?.image} sx={{ width: 72, height: 72 }} />
              <Box>
                <Typography variant="h5" fontWeight={800}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography color="text.secondary">{user?.email}</Typography>
              </Box>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
                <Typography fontWeight={700}>Contact</Typography>
                <Typography>Phone: {user?.phone}</Typography>
                <Typography>Gender: {user?.gender}</Typography>
                <Typography>Age: {user?.age}</Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
                <Typography fontWeight={700}>Company</Typography>
                <Typography>{user?.company?.name || "-"}</Typography>
                <Typography>{user?.company?.title || "-"}</Typography>
                <Typography>{user?.company?.department || "-"}</Typography>
              </Paper>
            </Stack>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography fontWeight={700}>Address</Typography>
              <Typography>
                {user?.address?.address}, {user?.address?.city}, {user?.address?.state}{" "}
                {user?.address?.postalCode}
              </Typography>
            </Paper>
          </Stack>
        )}
      </Paper>
    </Layout>
  );
}