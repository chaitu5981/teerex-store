import React from "react";
import { useStoreContext } from "./store";

const UpdateCart = ({ selectedQty, setSelectedQty, product }) => {
  const { incrementCart, decrementCart } = useStoreContext();
  return (
    <div className="add-to-cart">
      <button
        className="update-btn"
        onClick={() => {
          let newSelectedQty = selectedQty - 1;
          setSelectedQty(newSelectedQty);
          decrementCart(product, newSelectedQty);
        }}
      >
        -
      </button>
      {selectedQty}
      <button
        className="update-btn"
        onClick={() => {
          const newSelectedQty = product.quantity
            ? selectedQty + 1
            : selectedQty;
          setSelectedQty(newSelectedQty);
          incrementCart(product, newSelectedQty);
        }}
      >
        +
      </button>
    </div>
  );
};
export default UpdateCart;
