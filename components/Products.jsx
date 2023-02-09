import Image from "next/image";
import React, { useContext } from "react";
import { ProductsContext } from "./ProductContext";

const Products = ({ _id, name, price, description, picture }) => {
  const { setSelectedProducts } = useContext(ProductsContext);
  const addProduct = () => {
    setSelectedProducts((prev) => (prev ? [...prev, _id] : [_id]));
  };

  return (
    <div className="w-64">
      <div className="bg-blue-300 p-5 rounded-xl">
        <Image width={200} height={200} alt="" src={picture} />
      </div>
      <div className="mt-2">
        <h2 className="font-bold text-lg">{name}</h2>
      </div>
      <p className="text-sm mt-2 leading-4">{description}</p>
      <div className="flex mt-1 justify-betwee ">
        <div className="grow text-2xl font-bold">{price}$</div>
        <button
          onClick={addProduct}
          className="bg-emerald-400  text-white py-1 px-3 rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Products;
