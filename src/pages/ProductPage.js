import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useShop } from '../context/ShopContext';

function ProductPage() {
  const { id } = useParams();
  const { products, addToCart } = useShop();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <Typography>Ürün bulunamadı.</Typography>;
  }

  return (
    <Card>
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '66.67%', backgroundColor: '#f0f0f0' }}>
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
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fiyat: {product.price} TL
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {product.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToCart(product)}
          sx={{ mt: 2 }}
        >
          Sepete Ekle
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductPage;
