import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import https from "../../axios";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const counter = useRef();

  useEffect(() => {
    https.get(`/products/${id}`) 
      .then((res) => {
        setProduct(res.data.data); 
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const handleAddToCart = () => {
    localStorage.setItem("counter", count); 
    addToCart({
      id: product.id,
      title: product.attributes.title,
      price: product.attributes.price,
      image: product.attributes.image,
      company: product.attributes.company,
      colors: product.attributes.colors,
      count: count,
    });
  };

  return (
    <div className="container px-8 py-20 mx-auto max-w-6xl lg:px-8 flex justify-between">
      <div className="flex gap-20">
        <div className="w-[512px] h-[384px]">
          <img
            className="h-96 object-cover rounded-lg lg:w-full"
            src={product.attributes?.image}
            alt={product.attributes?.title}
          />
        </div>
        <div className="w-1/2">
          <h2 className="capitalize text-[#394E6A] text-3xl font-bold">
            {product.attributes.title}
          </h2>
          <p className="text-xl text-neutral-content font-bold mt-2">
            {product.attributes.company}
          </p>
          <p className="mt-3 text-xl">${product.attributes.price / 100}</p>
          <p className="mt-6 leading-8 text-base">
            {product.attributes.description}
          </p>
          <h4 className="text-md font-medium tracking-wider capitalize mt-6">
            colors
          </h4>
          <div className="colors">
            <button
              type="button"
              className="badge w-6 h-6 mr-2 false bg-green-500"
            ></button>
            <button
              type="button"
              className="badge w-6 h-6 mr-2 false bg-blue-500 border-secondary"
            ></button>
          </div>
          <label className="label" htmlFor="amount">
            <h4 className="text-md font-medium -tracking-wider capitalize">
              amount
            </h4>
          </label>
          <select
            ref={counter}
            onChange={(event) => {
              setCount(event.target.value);
            }}
            className="select border-primary border-solid select-bordered w-80 rounded-md select-md"
            id="amount"
          >
            {[...Array(20).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
          <br />
          <button
            onClick={handleAddToCart}
            className="btn hover:bg-blue-900 btn-md mt-12 border-none rounded-lg bg-blue-700 text-white"
          >
            Add to bag
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;