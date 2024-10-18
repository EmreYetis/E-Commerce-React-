import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useShop } from '../context/ShopContext';

function CartPage() {
  const { cart, removeFromCart, clearCart } = useShop();

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  if (cart.length === 0) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Sepetiniz boş.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Sepetiniz
      </Typography>
      <List>
        {cart.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <ListItemText
                primary={item.name}
                secondary={`${item.quantity} adet - Birim Fiyat: ${item.price.toFixed(2)} TL`}
              />
              <Typography variant="body2" sx={{ mr: 2 }}>
                Toplam: {(item.quantity * item.price).toFixed(2)} TL
              </Typography>
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  aria-label="delete"
                  onClick={() => removeFromCart(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Toplam: {total.toFixed(2)} TL
        </Typography>
        <Button 
          variant="contained" 
          color="secondary"
          onClick={clearCart}
        >
          Sepeti Boşalt
        </Button>
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Siparişi Tamamla
      </Button>
    </Box>
  );
}

export default CartPage;
