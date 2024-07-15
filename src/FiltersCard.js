import React, { useEffect, useState } from "react";
import { useStoreContext } from "./store";
import { getPriceRanges, getUniqueValues } from "./utils/helper";
import "./FiltersCard.css";
const FiltersCard = ({ searchUpdated, setSearchUpdated }) => {
  const { products, setFilteredProducts, products1 } = useStoreContext();
  const [colors, setColors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [types, setTypes] = useState([]);
  const [ranges, setRanges] = useState([]);

  const updateFilteredProducts = () => {
    const checkedColors = colors.filter((c) => c.checked).map((c) => c.color);
    const checkedGenders = genders
      .filter((g) => g.checked)
      .map((g) => g.gender);
    const checkedRanges = ranges.filter((r) => r.checked);
    const checkedTypes = types.filter((t) => t.checked).map((t) => t.type);
    let filteredProducts1;
    if (!checkedColors.length) filteredProducts1 = [...products1];
    else filteredProducts1 = [];
    products1.forEach((product) => {
      if (checkedColors.includes(product.color))
        filteredProducts1.push(product);
    });

    let filteredProducts2;
    if (!checkedGenders.length) filteredProducts2 = [...filteredProducts1];
    else filteredProducts2 = [];
    filteredProducts1.forEach((product) => {
      if (checkedGenders.includes(product.gender))
        filteredProducts2.push(product);
    });

    let filteredProducts3;
    if (!checkedRanges.length) filteredProducts3 = [...filteredProducts2];
    else filteredProducts3 = [];
    filteredProducts2.forEach((product) => {
      checkedRanges.forEach((r) => {
        if (product.price >= r.low && product.price < r.high)
          filteredProducts3.push(product);
      });
    });

    let filteredProducts4;
    if (!checkedTypes.length) filteredProducts4 = [...filteredProducts3];
    else filteredProducts4 = [];
    filteredProducts3.forEach((product) => {
      if (checkedTypes.includes(product.type)) filteredProducts4.push(product);
    });
    setFilteredProducts([...filteredProducts4]);
  };

  useEffect(() => {
    const colors1 = getUniqueValues(products.map((p) => p.color)).map((c) => ({
      color: c,
      checked: false,
    }));
    setColors([...colors1]);
    setGenders([
      { gender: "Men", checked: false },
      { gender: "Women", checked: false },
    ]);
    const ranges1 = getPriceRanges(products.map((p) => p.price)).map((p) => ({
      low: p[0],
      high: p[1],
      checked: false,
    }));
    setRanges([...ranges1]);
    const types1 = getUniqueValues(products.map((p) => p.type)).map((t) => ({
      type: t,
      checked: false,
    }));
    setTypes([...types1]);
  }, [products]);

  useEffect(() => {
    updateFilteredProducts();
  }, [colors, ranges, genders, types]);

  useEffect(() => {
    if (searchUpdated) {
      let prevColors = colors;
      prevColors.forEach((c) => {
        c.checked = false;
      });
      setColors([...prevColors]);
      setGenders((prevGenders) => {
        prevGenders.forEach((c) => {
          c.checked = false;
        });
        return prevGenders;
      });
      setRanges((prevRanges) => {
        prevRanges.forEach((c) => {
          c.checked = false;
        });
        return prevRanges;
      });
      setTypes((prevTypes) => {
        prevTypes.forEach((c) => {
          c.checked = false;
        });
        return prevTypes;
      });
      setSearchUpdated(false);
    }
  }, [searchUpdated]);

  const changeColorCheck = (e, i) => {
    const prevColors = colors;
    prevColors[i] = {
      color: prevColors[i].color,
      checked: e.target.checked,
    };
    setColors([...prevColors]);
  };

  const changeGenderCheck = (e, i) => {
    const prevGenders = genders;
    prevGenders[i] = {
      gender: prevGenders[i].gender,
      checked: e.target.checked,
    };
    setGenders([...prevGenders]);
  };

  const changeRangeCheck = (e, i) => {
    const prevRanges = ranges;
    prevRanges[i] = {
      low: prevRanges[i].low,
      high: prevRanges[i].high,
      checked: e.target.checked,
    };
    setRanges([...prevRanges]);
  };

  const changeTypeCheck = (e, i) => {
    const prevTypes = types;
    prevTypes[i] = {
      type: prevTypes[i].type,
      checked: e.target.checked,
    };
    setTypes([...prevTypes]);
  };

  return (
    <div className="filters-card">
      <div className="filter-category">
        <p>Color</p>
        {colors.map((item, index) => (
          <div className="filter-item" key={index}>
            <input
              type="checkbox"
              className="checkbox"
              checked={item.checked}
              onChange={(e) => changeColorCheck(e, index)}
            />
            <p>{item.color}</p>
          </div>
        ))}
      </div>
      <div className="filter-category">
        <p>Gender</p>
        {genders.map((item, index) => (
          <div className="filter-item" key={index}>
            <input
              type="checkbox"
              className="checkbox"
              checked={item.checked}
              onChange={(e) => changeGenderCheck(e, index)}
            />
            <p>{item.gender}</p>
          </div>
        ))}
      </div>
      <div className="filter-category">
        <p>Price</p>
        {ranges.map((item, index) => (
          <div className="filter-item" key={index}>
            <input
              type="checkbox"
              className="checkbox"
              checked={item.checked}
              onChange={(e) => changeRangeCheck(e, index)}
            />
            <p>
              Rs.{item.low} to Rs.{item.high}
            </p>
          </div>
        ))}
      </div>

      <div className="filter-category">
        <p>Type</p>
        {types.map((item, index) => (
          <div className="filter-item" key={index}>
            <input
              type="checkbox"
              className="checkbox"
              checked={item.checked}
              onChange={(e) => changeTypeCheck(e, index)}
            />
            <p>{item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltersCard;
