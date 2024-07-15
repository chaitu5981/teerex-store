import React, { useEffect, useMemo, useState } from "react";
import "./CartItem.css";
import UpdateCart from "./UpdateCart";
import { useStoreContext } from "./store";
const CartItem = ({ item, product }) => {
  const { deleteCartItem } = useStoreContext();
  const [selectedQty, setSelectedQty] = useState(item.selectedQty);

  if (selectedQty === 0) return;
  return (
    <div className="cart-item">
      <div className="cart-image-container">
        <img src={item.imageURL} alt="" className="cart-item-image" />
      </div>
      <div className="cart-item-info">
        <p>{item.name}</p>
        <p>Rs.{item.price}</p>
      </div>
      <div className="cart-item-qty">
        <UpdateCart
          selectedQty={item.selectedQty}
          setSelectedQty={setSelectedQty}
          product={product}
        />
      </div>
      <button
        className="cart-item-delete"
        onClick={() => {
          const qtyToDelete = selectedQty;
          deleteCartItem(product, qtyToDelete);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default CartItem;
