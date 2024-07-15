import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();
const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const getData = async () => {
    try {
      const url =
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
      const { data } = await axios.get(url);
      setProducts([...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setProducts1([...products]);
  }, [products]);

  useEffect(() => {
    setFilteredProducts([...products1]);
  }, [products1]);

  const incrementCart = (product, selectedQty) => {
    if (!product.quantity) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, [2000]);
      return;
    }
    product.quantity--;
    updateProducts(product);
    updateCart(product, selectedQty);
  };

  const decrementCart = (product, selectedQty) => {
    product.quantity++;
    updateProducts(product);
    updateCart(product, selectedQty);
  };

  const deleteCartItem = (product, selectedQty) => {
    product.quantity = product.quantity + selectedQty;
    updateProducts(product);
    updateCart(product, 0);
  };
  const updateProducts = (product) => {
    let prevProducts = [...products];
    // console.log(product);
    products.find((p) => p.id === product.id).quantity = product.quantity;
    setProducts([...prevProducts]);
  };

  const updateCart = (product, selectedQty) => {
    let cartItem = cart.find((c) => c.id === product.id);
    if (!cartItem) {
      cartItem = {
        ...product,
        selectedQty,
      };
      setCart([...cart, cartItem]);
    } else if (selectedQty === 0) {
      let cart1 = [...cart];
      cart1 = cart1.filter((c) => c.id !== cartItem.id);
      setCart([...cart1]);
    } else {
      let cart1 = [...cart];
      cart1[cart1.indexOf(cartItem)].selectedQty = selectedQty;
      setCart([...cart1]);
    }
  };
  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        products1,
        setProducts1,
        cart,
        setCart,
        incrementCart,
        decrementCart,
        showWarning,
        deleteCartItem,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export const useStoreContext = () => useContext(StoreContext);
export default StoreProvider;
