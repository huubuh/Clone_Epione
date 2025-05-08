import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage khi mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Lưu cart vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product, quantity = 1, variant = null) => {
    setCart((prev) => {
      // Kiểm tra sản phẩm đã có trong giỏ chưa (theo id + variant)
      const idx = prev.findIndex(
        (item) => item.id === product.id && item.variant === variant
      );
      if (idx !== -1) {
        // Đã có, tăng số lượng
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      // Chưa có, thêm mới
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          variant,
          quantity,
        },
      ];
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id, variant = null) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.variant === variant))
    );
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id, quantity, variant = null) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.variant === variant
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => setCart([]);

  // Tổng số lượng sản phẩm
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Tổng giá trị giỏ hàng
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
