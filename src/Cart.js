import React from "react";
import { useStoreContext } from "./store";
import CartItem from "./CartItem";
import "./Cart.css";
import Warning from "./Warning";
const Cart = () => {
  const { cart, products } = useStoreContext();
  const totalValue = () => {
    let total = 0;
    cart.forEach((c) => {
      total = total + c.price * c.selectedQty;
    });
    return total;
  };
  return (
    <div className="cart-container">
      <h4>Shopping Cart</h4>
      <div className="cart">
        {cart.map((item) => {
          const product = products.find((p) => p.id === item.id);
          return <CartItem key={item.id} item={item} product={product} />;
        })}
      </div>
      {totalValue() ? (
        <div className="total">
          <p>Total Amount : {totalValue()}</p>
        </div>
      ) : (
        <div />
      )}

      <Warning />
    </div>
  );
};

export default Cart;
