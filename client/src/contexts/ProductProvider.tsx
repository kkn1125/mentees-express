import React, { createContext, memo, useReducer } from "react";

const initialValue = [];

const LOAD = "product/load";

export const productsLoad = (products: Product[]): ProductAction => ({
  type: LOAD,
  products,
});

const reducer = (state: Product[], action: ProductAction) => {
  switch (action.type) {
    case LOAD:
      return action.products;
    default:
      break;
  }
};

export const ProductContext = createContext(initialValue);
export const ProductDispatchContext =
  createContext<React.Dispatch<ProductAction>>(null);

const ProductProvider = ({ children }: { children: React.ReactElement }) => {
  const [product, dispatch] = useReducer(reducer, initialValue);

  return (
    <ProductDispatchContext.Provider value={dispatch}>
      <ProductContext.Provider value={product}>
        {children}
      </ProductContext.Provider>
    </ProductDispatchContext.Provider>
  );
};

export default memo(ProductProvider);
