import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import https from "../../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Details() {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    https
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data.data);
        if (
          response.data.data.attributes.colors &&
          response.data.data.attributes.colors.length > 0
        ) {
          setSelectedColor(response.data.data.attributes.colors[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleAmountChange = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const addToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      title: product.attributes.title,
      price: product.attributes.price,
      image: product.attributes.image,
      amount: amount,
      color: selectedColor,
      company: product.attributes.company,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === cartItem.id && item.color === cartItem.color
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].amount += cartItem.amount;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    toast.success("Product added to cart successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>{product.attributes.title}</li>
        </ul>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.attributes.image}
          alt={product.attributes.title}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {product.attributes.title}
          </h1>
          <p className="text-xl text-gray-500 mb-2">
            {product.attributes.company}
          </p>
          <p className="text-2xl font-bold text-primary mb-4">
            ${product.attributes.price / 100}
          </p>
          <p className="mb-4">{product.attributes.description}</p>

          {product.attributes.colors && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Colors</h4>
              <div className="flex space-x-2">
                {product.attributes.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-gray-400 border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="form-control w-full max-w-xs mb-4">
            <label className="label" htmlFor="amount">
              <span className="label-text">Amount</span>
            </label>
            <select
              className="select select-bordered"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary" onClick={addToCart}>
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
