import React from 'react';
import { Typography, Grid } from '@mui/material';
import ProductList from '../components/ProductList';
import { useShop } from '../context/ShopContext';

function HomePage() {
  const { products, loading, error } = useShop();

  if (loading) {
    return <Typography>Yükleniyor...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Ürünlerimiz
      </Typography>
      {products.length === 0 ? (
        <Typography>Aradığınız ürün bulunamadı.</Typography>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}

export default HomePage;
