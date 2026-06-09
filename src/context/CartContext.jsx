import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 🧺 Drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 🧺 Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
        },
      ];
    });
  };

  // ➕ Increase quantity
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };

  // ➖ Decrease quantity
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // ❌ Remove item
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // 🧼 Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // 💰 Total
  const getTotal = () => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,

        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        getTotal,

        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>
  useContext(CartContext);