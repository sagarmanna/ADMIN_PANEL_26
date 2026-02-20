"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const isEmailValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = useCallback(() => {
    setError("");

    if (!name.trim()) return setError("Full name is required.");
    if (!email.trim() || !isEmailValid(email)) return setError("Valid email is required.");
    if (!username.trim()) return setError("Username is required.");
    if (password.trim().length < 6) return setError("Password must be at least 6 characters.");

    // DummyJSON doesn't persist signup. We simulate UX.
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/login?signup=success");
    }, 600);
  }, [name, email, username, password, router]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          Create Account
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
          Create your admin account to access the dashboard.
        </Typography>

        <Divider sx={{ my: 2 }} />

        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ mt: 2 }}>
          <TextField fullWidth label="Full name" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Username" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </Button>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" style={{ textDecoration: "none" }}>
                Back to login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}