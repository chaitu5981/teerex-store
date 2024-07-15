import React from "react";
import { useStoreContext } from "./store";

const Warning = () => {
  const { showWarning } = useStoreContext();
  return (
    <div>
      {showWarning ? (
        <div className="warning">
          <p>Product is Out of Stock</p>
        </div>
      ) : null}
    </div>
  );
};

export default Warning;
