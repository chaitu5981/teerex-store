import React, { useState } from "react";
import "./Search.css";
import { useStoreContext } from "./store";
const Search = ({ setSearchUpdated }) => {
  const { products, setProducts1 } = useStoreContext();
  const [searchString, setSearchString] = useState("");
  const updateSearch = (str) => {
    let tempProducts = [...products];
    setSearchUpdated(true);
    if (!str) return setProducts1([...products]);
    const searchWords = searchString.split(" ");
    searchWords.forEach((word) => {
      let tempProducts1 = [];
      tempProducts.forEach((product) => {
        if (
          product.name.toLowerCase().includes(word.toLowerCase()) ||
          product.gender.toLowerCase().includes(word.toLowerCase()) ||
          product.color.toLowerCase().includes(word.toLowerCase()) ||
          product.type.toLowerCase().includes(word.toLowerCase())
        )
          tempProducts1.push(product);
      });
      tempProducts = [...tempProducts1];
    });
    setProducts1([...tempProducts]);
  };
  return (
    <div className="search">
      <input
        type="text"
        className="search-input"
        placeholder="Search for products"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button className="search-btn" onClick={() => updateSearch(searchString)}>
        Search
      </button>
      <button
        className="search-btn"
        onClick={() => {
          updateSearch("");
          setSearchString("");
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Search;
