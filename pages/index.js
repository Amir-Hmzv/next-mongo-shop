import Products from "../components/Products";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { initMongoose } from "@/lib/mongoose";
import { findAllProducts } from "./api/products";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

const Home = ({ products }) => {
  const [pharse, setPharse] = useState("");

  const categorysName = [...new Set(products.map((item) => item.category))];

  let productX;
  if (pharse) {
    productX = products.filter((item) =>
      item.name.toLowerCase().includes(pharse)
    );
  } else {
    productX = products;
  }

  return (
    <Layout>
      <div className="p-5 ">
        <input
          value={pharse}
          onChange={(e) => setPharse(e.target.value)}
          type={"text"}
          placeholder="search for products "
          className="bg-gray-100 w-full px-4 py-2 rounded-xl"
        />

        {categorysName.map((categoryName, index) => (
          <div key={categoryName}>
            {productX?.find((item) => item.category === categoryName) && (
              <>
                {" "}
                <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
                <div className="flex  -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {productX
                    .filter((p) => p.category === categoryName)
                    .map((product) => (
                      <div key={product._id} className="px-5 snap-center">
                        <Products {...product} />
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
