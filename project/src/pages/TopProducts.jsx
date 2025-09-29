
import React, { useEffect, useState, useContext } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../Api/Axios_Instance";
import { AuthContext } from "../context/AuthContext";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // ✅ Fetch products from db.json
  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data.slice(0, 8)); // only first 8 products
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  // ✅ Add to Cart
  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    if (!user) return navigate("/login");

    try {
      const res = await api.get(`/users/${user.id}`);
      let cart = res.data.cart || [];

      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        cart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      await api.patch(`/users/${user.id}`, { cart });
      toast.success(`${product.name} added to cart!`);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart.");
    }
  };

  // ✅ Add to Wishlist
  const handleAddToWishlist = async (e, product) => {
    e.stopPropagation();
    if (!user) return navigate("/login");

    try {
      const res = await api.get(`/users/${user.id}`);
      let wishlist = res.data.wishlist || [];

      const exists = wishlist.some((item) => item.id === product.id);
      if (!exists) wishlist.push(product);

      await api.patch(`/users/${user.id}`, { wishlist });
      toast.success(`${product.name} added to wishlist!`);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error("Failed to add item to wishlist.");
    }
  };

  return (
    <section className="bg-teal-50/50 py-20 w-full">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Explore our handpicked selection of top-rated electronics.
          </p>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* ✅ Product Image Click → Navigate */}
              <div
                className="aspect-square w-full overflow-hidden bg-white p-6 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Action buttons on hover */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="p-2.5 bg-white rounded-full shadow-lg hover:bg-teal-500 hover:text-white text-gray-700 transition-all transform hover:scale-110"
                >
                  <ShoppingCart size={18} />
                </button>
                <button
                  onClick={(e) => handleAddToWishlist(e, product)}
                  className="p-2.5 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white text-gray-700 transition-all transform hover:scale-110"
                >
                  <Heart size={18} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 border-t border-gray-100 flex flex-col flex-grow">
                <div className="mb-2">
                  <div className="text-xs font-medium text-teal-800 bg-teal-100 px-2.5 py-1 rounded-full inline-block">
                    {product.category}
                  </div>
                </div>

                <h3 className="text-base font-semibold text-gray-800 transition truncate flex-grow group-hover:text-teal-600">
                  {product.name}
                </h3>

                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? "text-amber-400 fill-amber-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-gray-500">
                    (24 reviews)
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-xl font-bold text-gray-900">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
