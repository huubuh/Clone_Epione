import React, { useState } from "react";
import { Drawer, Button, message } from "antd";
import { useCart } from "../context/CartContext";
import axios from "axios";

const TrashIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    style={{ cursor: "pointer" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const CartDrawer = ({ drawerOpen, setDrawerOpen, userInfo, setUserInfo }) => {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    if (!userInfo) return;
    setCheckoutLoading(true);
    try {
      const newOrder = {
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        items: cart,
        total: cartTotal,
      };
      await axios.patch(`http://localhost:3000/users/${userInfo.id}`, {
        orders: [...(userInfo.orders || []), newOrder],
      });
      clearCart();
      setDrawerOpen(false);
      message.success("Đơn hàng sẽ được giao đến bạn");
      setUserInfo({
        ...userInfo,
        orders: [...(userInfo.orders || []), newOrder],
      });
    } catch {
      message.error("Có lỗi khi thanh toán!");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <Drawer
      title="Giỏ hàng"
      placement="right"
      onClose={() => setDrawerOpen(false)}
      open={drawerOpen}
      width={400}
    >
      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="empty"
            className="w-28 mx-auto"
          />
          <div className="text-red-500 mt-4">Giỏ hàng của bạn đang trống</div>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id + (item.variant || "")}
              className="flex items-center mb-4 border-b border-b-gray-300 pb-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 rounded mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                {item.variant && (
                  <div className="text-xs text-gray-500">{item.variant}</div>
                )}
                <div className="flex items-center mt-1">
                  <Button
                    size="small"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.max(1, item.quantity - 1),
                        item.variant
                      )
                    }
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    size="small"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1, item.variant)
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="font-semibold text-[#1106a7] min-w-[80px] text-right">
                {item.price.toLocaleString()}đ
              </div>
              <TrashIcon
                onClick={() => removeFromCart(item.id, item.variant)}
              />
            </div>
          ))}

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-medium mb-4">
              <span>Tạm tính:</span>
              <span className="text-[#1106a7]">
                {cartTotal.toLocaleString()}đ
              </span>
            </div>
            <Button
              type="primary"
              block
              onClick={handleCheckout}
              loading={checkoutLoading}
            >
              Thanh toán
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
