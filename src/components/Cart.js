import React from 'react';

function Cart() {
  // Örnek sepet öğeleri
  const cartItems = [
    { id: 1, name: 'Ürün 1', quantity: 2 },
    { id: 2, name: 'Ürün 2', quantity: 1 },
  ];

  return (
    <div className="cart">
      <h2>Sepet İçeriği</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Adet: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
