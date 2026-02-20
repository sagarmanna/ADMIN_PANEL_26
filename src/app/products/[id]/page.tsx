"use client";

import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { useProductStore } from "@/store/productStore";
import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { fetchProductById } = useProductStore();
  const [p, setP] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchProductById(params.id);
      setP(data);
      setImgIndex(0);
      setLoading(false);
    })();
  }, [fetchProductById, params.id]);

  const images = useMemo(() => p?.images || [], [p]);

  return (
    <Layout>
      <Paper sx={{ p: 3 }}>
        <Button component={Link} href="/products" variant="text">
          ← Back to Products
        </Button>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="h5" fontWeight={900}>
              {p?.title}
            </Typography>

            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Box
                  component="img"
                  src={images[imgIndex] || p?.thumbnail}
                  alt={p?.title}
                  sx={{ width: "100%", borderRadius: 2, maxHeight: 360, objectFit: "cover" }}
                />
                <Stack direction="row" spacing={1} sx={{ mt: 1, overflowX: "auto" }}>
                  {images.map((src: string, i: number) => (
                    <Box
                      key={src}
                      component="img"
                      src={src}
                      onClick={() => setImgIndex(i)}
                      alt="thumb"
                      sx={{
                        width: 64,
                        height: 48,
                        borderRadius: 1,
                        objectFit: "cover",
                        cursor: "pointer",
                        border: i === imgIndex ? "2px solid" : "1px solid",
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip label={p?.category} />
                    <Rating value={p?.rating} precision={0.5} readOnly />
                  </Stack>

                  <Typography fontWeight={800}>Price: ₹ {p?.price}</Typography>
                  <Typography color="text.secondary">{p?.description}</Typography>

                  <Typography fontWeight={800} sx={{ mt: 1 }}>
                    Specs
                  </Typography>
                  <Typography>Brand: {p?.brand}</Typography>
                  <Typography>Stock: {p?.stock}</Typography>
                </Stack>
              </Paper>
            </Stack>
          </Stack>
        )}
      </Paper>
    </Layout>
  );
}