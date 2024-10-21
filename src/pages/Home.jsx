import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import https from "../../axios";
function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    https
      .get("/products?featured=true")
      .then((res) => setData(res.data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleClick = (id) => {
    https
      .get(`/products/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate(`/product/${id}`);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  };
  console.log(data);
  return (
    <div>
      <div className="container px-8 py-20 mx-auto max-w-6xl flex justify-between">
        <div className="max-w-lg flex flex-wrap items-center">
        <h1 className={`max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl mt-5 ${isDarkTheme ? 'text-white' : 'text-slate-700'}`}>
                We are changing the way people shop
            </h1>
          <p className="mt- -5 max-w-xl text-lg leading-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="text-white btn btn-info"
          >
            OUR PRODUCTS
          </button>
        </div>
        <div
          style={{ width: "496px", height: "448px" }}
          className="carousel carousel-center bg-neutral rounded-box space-x-4 p-4"
        >
          <div className="carousel-item">
            <img
              width={320}
              height={416}
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              width={320}
              height={416}
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              width={320}
              height={416}
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              width={320}
              height={416}
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp"
              className="rounded-box"
            />
          </div>
        </div>
      </div>
      <div className="featuredproducts">
        <h2 className="max-w-6xl mx-auto text-3xl font-medium tracking-wider capitalize pb-5">
          Featured Products
        </h2>
        <div className="wrapper flex max-w-6xl mx-auto justify-between border-t-2 pt-10 mb-10">
          {data.length > 0 &&
            data.map((el, index) => {
              console.log(el);
              return (
                <div
                  onClick={() => handleClick(el.id)}
                  style={{ width: "352px", height: "332px", cursor: "pointer" }}
                  className="shadow-xl hover:shadow-2xl transition duration-300 p-4 rounded-2xl"
                  key={index}
                >
                  <div className="text-center">
                    <div
                      style={{ maxHeight: "192px", maxWidth: "320px" }}
                      className=""
                    >
                      <img
                        className="w-80 h-52 rounded-xl"
                        src={el.attributes.image}
                        alt={el.attributes.title}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="pt-9 capitalize tracking-wider text-center">
                        {el.attributes.title}
                      </h3>

                      <p>${el.attributes.price / 100}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
