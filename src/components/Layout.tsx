"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useAuthStore } from "@/store/authStore";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import React, { useCallback } from "react";

const NavButton = React.memo(function NavButton({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Button
      component={Link}
      href={href}
      color="inherit"
      variant={active ? "outlined" : "text"}
      size="small"
      sx={{ borderColor: "rgba(255,255,255,0.6)" }}
    >
      {label}
    </Button>
  );
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useSession();
  const clear = useAuthStore((s) => s.clear);

  const onLogout = useCallback(async () => {
    clear();
    await signOut({ redirect: false });
    router.push("/login");
  }, [clear, router]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography fontWeight={700} sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <NavButton href="/dashboard" label="Dashboard" active={pathname === "/dashboard"} />
            <NavButton href="/users" label="Users" active={pathname.startsWith("/users")} />
            <NavButton href="/products" label="Products" active={pathname.startsWith("/products")} />
            <Typography variant="body2" sx={{ mx: 1, opacity: 0.9 }}>
              {data?.user?.name || ""}
            </Typography>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>{children}</Container>
    </Box>
  );
}