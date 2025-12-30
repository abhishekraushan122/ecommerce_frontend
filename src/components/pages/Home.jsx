import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import api from "../../api/axiosClient";
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {

  /* ---------------------- CATEGORIES ---------------------- */
  const categories = [
    { id: 1, name: "Grocery", img: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png" },
    { id: 2, name: "Mobiles", img: "https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png" },
    { id: 3, name: "Fashion", img: "https://rukminim2.flixcart.com/flap/128/128/image/0d75b34f7d8fbcb3.png" },
    { id: 4, name: "Electronics", img: "https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png" },
    { id: 5, name: "Home", img: "https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.png" },
    { id: 6, name: "Appliances", img: "https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png" },
    { id: 7, name: "Travel", img: "https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b4693.png" },
    { id: 8, name: "Toys", img: "https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png" },
  ];

  /* ---------------------- CAROUSEL ---------------------- */
  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1512445239397-75fef09f9e4f",
      title: "Big Sale 50% OFF",
      desc: "Grab the hottest electronics at half price!"
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1503342452485-86b7f54527dd",
      title: "Fashion New Arrivals",
      desc: "Premium clothing with trendy style."
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1495435229349-e86db7bfa013",
      title: "Home Essentials",
      desc: "Upgrade your home with top-quality products."
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  /* ---------------------- PRODUCTS ---------------------- */
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    api.get("/products/best-sellers")
      .then(res => setBestSellers(res.data));
  }, []);

  // const trending = [
  //   { id: 1, title: "Sneakers", price: "$89", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
  //   { id: 2, title: "Perfume", price: "$59", img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500" },
  //   { id: 3, title: "Handbag", price: "$149", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" },
  // ];
  const [trendings, setTrendings] = useState([]);
  useEffect(() => {
    api.get("/products/trending").then(res => {
      setTrendings(res.data);
    });
  }, []);
  return (
    <div className="bg-gray-100">

      {/* ---------------------- CATEGORY SCROLL (MOBILE LIKE FLIPKART) ---------------------- */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-4 sm:grid-cols-8 gap-4 px-4 text-center">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center cursor-pointer group"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="h-12 sm:h-14 mb-1 group-hover:scale-105 transition"
              />
              <span className="text-xs sm:text-sm font-medium group-hover:text-blue-600">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------- CAROUSEL ---------------------- */}
      <section className="relative w-full h-[45vh] sm:h-[60vh] mt-2 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === i ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={slide.img} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-2xl sm:text-4xl font-bold mb-3">{slide.title}</h1>
              <p className="text-sm sm:text-base mb-4">{slide.desc}</p>
              <button className="bg-white text-black px-5 py-2 rounded-full font-semibold">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------------- BEST SELLING ---------------------- */}
      <section className="max-w-7xl mx-auto mt-10 bg-white p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Best Selling</h2>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {bestSellers.map(product => (
            <SwiperSlide key={product.id}>
              <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
                >
              <div className="text-center">
                  <img src={`${import.meta.env.VITE_API_URL}/uploads/${product.images?.[0]}`} className="h-32 sm:h-40 mx-auto object-cover rounded-md" />
                  <h3 className="mt-3 text-sm font-semibold truncate">
                    {product.title}
                  </h3>

                  <p className="text-green-600 text-sm font-bold mt-1">
                    ₹{product.price}
                  </p>
               
              </div>
               </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ---------------------- TRENDING ---------------------- */}
      <section className="max-w-7xl mx-auto mt-8 bg-white p-4 sm:p-6 mb-14">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Trending Now</h2>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {trendings.map((product) => (
            <SwiperSlide key={product._id}>
              <Link
                to={`/product/${product._id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition block p-4"
              >
                <div className="text-center">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${product?.images?.[0]}`}
                    alt={product.title}
                    className="h-32 sm:h-40 mx-auto object-cover rounded-md"
                  />

                  <h3 className="mt-3 text-sm font-semibold truncate">
                    {product.title}
                  </h3>

                  <p className="text-green-600 text-sm font-bold mt-1">
                    ₹{product.price}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}

        </Swiper>
      </section>

    </div>
  );
}
