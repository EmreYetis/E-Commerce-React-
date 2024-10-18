import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const productsData = response.data.map(item => ({
        id: item.id,
        name: item.title,
        price: item.price,
        description: item.description,
        image: item.image,
        category: item.category
      }));
      setProducts(productsData);
      setLoading(false);
    } catch (err) {
      setError('Ürünler yüklenirken bir hata oluştu.');
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex((item) => item.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...currentCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        return newCart;
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const searchProducts = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <ShopContext.Provider value={{ 
      products: filteredProducts, 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart,
      searchProducts,
      loading, 
      error 
    }}>
      {children}
    </ShopContext.Provider>
  );
};
