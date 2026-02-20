"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import { useUserStore } from "@/store/userStore";
import { useProductStore } from "@/store/productStore";

function StatCard({
  title,
  value,
  icon,
  loading,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  loading: boolean;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* subtle top strip */}
      <Box
        sx={{
          height: 6,
          background:
            "linear-gradient(90deg, rgba(25,118,210,1) 0%, rgba(156,39,176,1) 100%)",
        }}
      />
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>

            {loading ? (
              <Skeleton width={90} height={44} />
            ) : (
              <Typography variant="h3" fontWeight={800} lineHeight={1.1}>
                {value}
              </Typography>
            )}
          </Box>

          {/* icon bubble */}
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: 2.5,
              display: "grid",
              placeItems: "center",
              bgcolor: "action.hover",
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { total: usersTotal, isLoading: usersLoading, fetchUsers } = useUserStore();
  const {
    total: productsTotal,
    isLoading: productsLoading,
    categories,
    fetchProducts,
    fetchCategories,
  } = useProductStore();

  useEffect(() => {
    // only for totals
    fetchUsers({ limit: 10, skip: 0, q: "" });
    fetchProducts({ limit: 10, skip: 0, q: "", category: "" });
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = usersLoading || productsLoading;
  const totalCategories = useMemo(() => categories?.length || 0, [categories]);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        bgcolor: "background.default",
        py: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Stack spacing={0.7} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={900}>
            Dashboard
          </Typography>
          <Typography color="text.secondary">
            
          </Typography>
        </Stack>

        {/* Top cards */}
        <Grid container spacing={2.2}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={usersTotal ?? 0}
              loading={loading}
              icon={<PeopleAltOutlinedIcon sx={{ fontSize: 30 }} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Products"
              value={productsTotal ?? 0}
              loading={loading}
              icon={<Inventory2OutlinedIcon sx={{ fontSize: 30 }} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Product Categories"
              value={totalCategories}
              loading={loading && totalCategories === 0}
              icon={<CategoryOutlinedIcon sx={{ fontSize: 30 }} />}
            />
          </Grid>

          {/* Actions card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 2.5, height: "100%" }}>
                <Typography variant="subtitle1" fontWeight={800}>
                  Quick Actions
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1.8 }}>
                  Jump to key sections.
                </Typography>

                <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                  <Button component={Link} href="/users" variant="contained" size="small">
                    Users
                  </Button>
                  <Button component={Link} href="/products" variant="outlined" size="small">
                    Products
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Optional section (looks premium, still within scope) */}
          <Grid item xs={12}>
            <Card
              elevation={0}
              sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", md: "center" }}
                  spacing={2}
                >
                  <Box>
                    <Typography variant="h6" fontWeight={900}>
                      Admin Panel
                    </Typography>
                    <Typography color="text.secondary">
                      Manage users and products with search, filters, pagination & detail views.
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1.2}>
                    <Button component={Link} href="/users" variant="contained">
                      Manage Users
                    </Button>
                    <Button component={Link} href="/products" variant="outlined">
                      Manage Products
                    </Button>
                  </Stack>
                </Stack>

                <Divider sx={{ my: 2.5 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "action.hover",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Typography fontWeight={800}>Users</Typography>
                      <Typography variant="body2" color="text.secondary">
                        
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "action.hover",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Typography fontWeight={800}>Products</Typography>
                      <Typography variant="body2" color="text.secondary">
                        
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}