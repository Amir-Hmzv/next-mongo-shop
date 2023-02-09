import { Children, createContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductsContext = createContext({});

export function ProductContextProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    de: [],
  });
  return (
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
