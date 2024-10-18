import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useShop } from '../context/ShopContext';

function ProductList() {
  const { products, addToCart, loading, error } = useShop();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const formatPrice = (price) => `${(price * 28).toFixed(2)} TL`; // Örnek bir döviz kuru

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: '#f0f0f0' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography gutterBottom variant="h6" component="div" sx={{ minHeight: '64px', overflow: 'hidden' }}>
                {truncateText(product.name, 50)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Fiyat: {formatPrice(product.price)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                {truncateText(product.description, 100)}
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Button
                  component={RouterLink}
                  to={`/product/${product.id}`}
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 1, width: 'calc(50% - 4px)' }}
                >
                  Detaylar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(product)}
                  sx={{ width: 'calc(50% - 4px)' }}
                >
                  Sepete Ekle
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
