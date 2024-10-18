import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Footer() {
  const theme = useTheme();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        py: 6 
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          E-Ticaret
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          component="p"
        >
          © {new Date().getFullYear()} Tüm hakları saklıdır.
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          <Link color="inherit" href="/">
            Gizlilik Politikası
          </Link>{' '}
          ·{' '}
          <Link color="inherit" href="/">
            Kullanım Şartları
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
