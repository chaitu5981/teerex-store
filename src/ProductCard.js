import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { useStoreContext } from "./store";
import UpdateCart from "./UpdateCart";
import Warning from "./Warning";
const ProductCard = ({ product }) => {
  const { cart, setCart, products, setProducts, incrementCart } =
    useStoreContext();
  let cartItem = cart.find((c) => c.id === product.id);
  const [selectedQty, setSelectedQty] = useState(
    cartItem ? cartItem.selectedQty : 0
  );

  return (
    <div className="prod-card">
      <div className="inner-prod-card">
        <p>{product.name}</p>
        <img src={product.imageURL} alt="" className="prod-image" />
      </div>
      <div className="prod-card-bottom">
        <p className="prod-price">Rs.{product.price}</p>

        {selectedQty ? (
          <UpdateCart
            selectedQty={selectedQty}
            setSelectedQty={setSelectedQty}
            product={product}
          />
        ) : (
          <div className="add-to-cart">
            <button
              onClick={() => {
                const newSelectedQty = product.quantity
                  ? selectedQty + 1
                  : selectedQty;
                setSelectedQty(newSelectedQty);
                incrementCart(product, newSelectedQty);
              }}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
      <Warning />
    </div>
  );
};

export default ProductCard;
