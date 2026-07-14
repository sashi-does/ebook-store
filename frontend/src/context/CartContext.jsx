import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { triggerAlert } = useContext(AuthContext);

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Sync to local storage
  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (book, quantity = 1) => {
    const qtyToAdd = Number(quantity);
    const existingItem = cartItems.find((item) => item.bookId === book._id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + qtyToAdd;
      if (newQuantity > book.stock) {
        triggerAlert(`Only ${book.stock} units available in stock.`, 'error');
        return;
      }
      const updated = cartItems.map((item) =>
        item.bookId === book._id ? { ...item, quantity: newQuantity } : item
      );
      saveCart(updated);
    } else {
      if (qtyToAdd > book.stock) {
        triggerAlert(`Only ${book.stock} units available in stock.`, 'error');
        return;
      }
      saveCart([
        ...cartItems,
        {
          bookId: book._id,
          title: book.title,
          price: book.price,
          image: book.image,
          stock: book.stock,
          quantity: qtyToAdd,
        },
      ]);
    }
    triggerAlert(`"${book.title}" added to cart!`);
  };

  const removeFromCart = (bookId) => {
    const item = cartItems.find((i) => i.bookId === bookId);
    const updated = cartItems.filter((i) => i.bookId !== bookId);
    saveCart(updated);
    if (item) {
      triggerAlert(`Removed "${item.title}" from cart.`);
    }
  };

  const updateQuantity = (bookId, quantity) => {
    const qty = Number(quantity);
    const item = cartItems.find((i) => i.bookId === bookId);
    if (!item) return;

    if (qty > item.stock) {
      triggerAlert(`Only ${item.stock} units available in stock.`, 'error');
      return;
    }

    if (qty <= 0) {
      removeFromCart(bookId);
      return;
    }

    const updated = cartItems.map((i) =>
      i.bookId === bookId ? { ...i, quantity: qty } : i
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
