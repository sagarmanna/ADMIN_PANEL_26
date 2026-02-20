"use client";

import { useState, useCallback, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/dashboard";

  const { status } = useSession();
  const setToken = useAuthStore((s) => s.setToken);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (status === "authenticated") router.push(from);
  }, [status, router, from]);

  const onSubmit = useCallback(async () => {
    setErr("");

    const res = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    if (res?.ok) {
      // token is stored in next-auth session; Zustand is optional cache
      // we store dummy flag token just to show auth state in store too
      setToken("logged-in");
      router.push(from);
      return;
    }
    setErr("Invalid credentials. Please try again.");
  }, [identifier, password, router, from, setToken]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800}>
          Admin Login
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 3 }} color="text.secondary">
          Use DummyJSON credentials. You can login using Username / Email / numeric ID.
        </Typography>

        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Username / Email / ID"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="off"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            helperText="If you login by ID, password is auto-resolved from DummyJSON user record (demo API)."
          />
          <Button variant="contained" size="large" onClick={onSubmit}>
            LOGIN
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}