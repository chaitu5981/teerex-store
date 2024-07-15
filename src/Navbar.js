import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import "./Navbar.css";
import { useStoreContext } from "./store";
const Navbar = () => {
  const { cart } = useStoreContext();
  const [cartQty, setCartQty] = useState(0);
  const [activeLink, setActiveLink] = useState("products");
  const getCartQty = () => {
    let total = 0;
    cart.forEach((c) => {
      let num = c?.selectedQty ? c.selectedQty : 0;
      total = total + num;
    });
    return total;
  };
  useEffect(() => {
    setCartQty(getCartQty());
  }, [cart]);
  return (
    <div className="navbar">
      <div className="nav-left">TeeRex Store</div>
      <div className="nav-right">
        <NavLink
          to="/products"
          className="products-link"
          onClick={() => setActiveLink("products")}
        >
          Products
        </NavLink>

        <NavLink
          to="/cart"
          className="cart-link"
          onClick={() => setActiveLink("cart")}
        >
          <IoCartOutline />
          <div className="cart-qty">{cartQty}</div>
        </NavLink>
        <div
          className={
            activeLink === "products"
              ? "underline-products underline"
              : "underline-cart underline"
          }
        ></div>
      </div>
    </div>
  );
};

export default Navbar;
