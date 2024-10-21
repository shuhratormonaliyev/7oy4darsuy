import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 5.00;
  const taxRate = 0.10;
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(cartItems);
  }, []);

  useEffect(() => {
    const newSubtotal = products.reduce((sum, product) => sum + product.price * product.count, 0);
    setSubtotal(newSubtotal);
  }, [products]);

  const handleAmountChange = (index, newAmount) => {
    const updatedProducts = [...products];
    updatedProducts[index].count = parseInt(newAmount);
    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  const handleRemove = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          {products.map((product, index) => (
            <div className="flex items-center space-x-4 my-8 p-4 border rounded-lg" key={index}>
              <img className="w-32 h-32 rounded-lg object-cover" src={product.image} alt={product.title} />
              
              <div className="flex-grow">
                <h2 className="text-xl font-medium capitalize">{product.title}</h2>
                <p className="text-sm text-gray-600 capitalize">{product.company}</p>
                <p className="mt-2">
                  Color: <span className="inline-block w-4 h-4 rounded-full bg-gray-300 ml-2"></span>
                </p>
              </div>

              <div className="flex flex-col items-center">
                <label htmlFor={`amount-${index}`} className="block text-sm font-medium text-gray-700">Amount</label>
                <select 
                  id={`amount-${index}`}
                  className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={product.count}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                >
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <button 
                  onClick={() => handleRemove(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  remove
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-medium">${(product.price * product.count).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:w-1/3">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
              <span>Order Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link 
              to="/checkout"
              className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-blue-700 transition duration-300"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;