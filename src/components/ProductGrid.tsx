"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

const ProductGrid = React.memo(function ProductGrid({ products }: { products: any[] }) {
  return (
    <Grid container spacing={2}>
      {products.map((p) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
          <Card>
            <CardActionArea component={Link} href={`/products/${p.id}`}>
              <CardMedia component="img" height="160" image={p.thumbnail} alt={p.title} />
              <CardContent>
                <Typography fontWeight={800} noWrap>
                  {p.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.category}
                </Typography>
                <Typography fontWeight={700}>₹ {p.price}</Typography>
                <Rating value={p.rating} precision={0.5} readOnly size="small" />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default ProductGrid;