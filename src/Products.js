import React, { useState } from "react";
import { useStoreContext } from "./store";
import ProductCard from "./ProductCard";
import FiltersCard from "./FiltersCard";
import "./Products.css";
import Search from "./Search";
const Products = () => {
  const { filteredProducts, products1 } = useStoreContext();
  const [searchUpdated, setSearchUpdated] = useState(false);

  return (
    <div className="prod-page-container">
      <Search setSearchUpdated={setSearchUpdated} />
      <div className="prod-container">
        <div className="prod-container-left">
          <FiltersCard
            searchUpdated={searchUpdated}
            setSearchUpdated={setSearchUpdated}
          />
        </div>
        <div className="prod-container-right">
          {filteredProducts.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
