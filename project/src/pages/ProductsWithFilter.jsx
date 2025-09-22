
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ProductCategories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/products")
//       .then((res) => {
//         // ✅ Group categories with their first product image
//         const categoryMap = {};
//         res.data.forEach((p) => {
//           if (!categoryMap[p.category]) {
//             categoryMap[p.category] = p.image; // take first product image for that category
//           }
//         });

//         // Convert to array of objects
//         const uniqueCats = Object.keys(categoryMap).map((cat) => ({
//           name: cat,
//           image: categoryMap[cat],
//         }));

//         setCategories(uniqueCats);
//       })
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);

//   return (
//     <section className="bg-white py-12 w-full">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Section Title */}
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-red-500 pl-3">
//           Shop by Category
//         </h2>

//         {/* Categories */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {categories.map((cat, i) => (
//             <div
//               key={i}
//               className="cursor-pointer border rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6 flex flex-col items-center bg-gray-50 hover:bg-red-50"
//             >
//               {/* Category Image */}
//               <img
//                 src={cat.image}
//                 alt={cat.name}
//                 className="w-20 h-20 object-contain mb-3"
//               />
//               <h3 className="text-gray-800 font-semibold">{cat.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductCategories;















import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        // ✅ Group categories with their first product image
        const categoryMap = {};
        res.data.forEach((p) => {
          if (!categoryMap[p.category]) {
            categoryMap[p.category] = p.image;
          }
        });

        const uniqueCats = Object.keys(categoryMap).map((cat) => ({
          name: cat,
          image: categoryMap[cat],
        }));

        setCategories(uniqueCats);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/product?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="bg-white py-12 w-full">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-red-500 pl-3">
          Shop by Category
        </h2>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => handleCategoryClick(cat.name)}
              className="cursor-pointer border rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6 flex flex-col items-center bg-gray-50 hover:bg-red-50"
            >
              {/* Category Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 object-contain mb-3"
              />
              <h3 className="text-gray-800 font-semibold">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;

