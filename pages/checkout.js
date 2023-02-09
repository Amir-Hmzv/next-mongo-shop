import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const CheckoutPage = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productInfo, setProductInfo] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductInfo(json));
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }
  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    console.log(pos);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }
  console.log(productInfo);
  let deliveryPrice = 5;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (const id of selectedProducts) {
      const price = productInfo.find((p) => p._id === id)?.price || 0;
      subtotal += price;
    }
  }
  const total = subtotal + deliveryPrice;
  console.log(selectedProducts);
  return (
    <Layout>
      {!productInfo.length && <div>no product in your shopping cart</div>}
      {productInfo.length &&
        productInfo.map((item) => {
          const amount = selectedProducts.filter(id => id === item._id).length;
          if (amount === 0) return;
          return (
            <div key={item._id}>
              <div className="flex mb-5">
                <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                  <Image
                    className="w-24"
                    width={200}
                    height={200}
                    src={item.picture}
                    alt=""
                  />
                </div>
                <div className="pl-4">
                  <h3 className="font-bold text-lg"> {item.name}</h3>
                  <p className="text-sm leading-4 text-gray-400">
                    {item.description}
                  </p>
                  <div className="flex   ">
                    <div className="grow">{item.price}</div>
                    <div>
                      <button
                        onClick={() => lessOfThisProduct(item._id)}
                        className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                      >
                        -
                      </button>
                      <span className="px-2">
                        {
                          selectedProducts.filter((id) => id === item._id)
                            .length
                        }
                      </span>
                      <button
                        onClick={() => moreOfThisProduct(item._id)}
                        className="bg-emerald-500 px-2 rounded-lg text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <form action="/api/checkout" method="POST">
        <div className="mt-8">
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Street address, number"
          />
          <input
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="City and postal code"
          />
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Your name"
          />
          <input
            name="emaill"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="email"
            placeholder="Email address"
          />
        </div>
        <input />
        <div className="mt-8">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">${subtotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="font-bold">${deliveryPrice}</h3>
          </div>
          <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">${total}</h3>
          </div>
        </div>
        <input
          type="hidden"
          name="products"
          value={selectedProducts?.join(",")}
        />
        <button
          type="submit"
          className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg"
        >
          Pay ${total}
        </button>
      </form>
    </Layout>
  );
};

export default CheckoutPage;
