



// import React, { createContext, useContext, useState } from "react";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   // Add/remove toggle function
//   const toggleWishlist = (product) => {
//     setWishlist((prevWishlist) => {
//       const exists = prevWishlist.find((item) => item.id === product.id);
//       if (exists) {
//         return prevWishlist.filter((item) => item.id !== product.id);
//       } else {
//         return [...prevWishlist, product];
//       }
//     });

//     window.dispatchEvent(new Event("wishlistUpdated"));
//   };

//   // REMOVE function for Wishlist page
//   const removeFromWishlist = (id) => {
//     setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
//     window.dispatchEvent(new Event("wishlistUpdated"));
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// // Hook to use Wishlist
// export const useWishlist = () => useContext(WishlistContext);










import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // Initialize wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add/remove toggle function
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  // REMOVE function for Wishlist page
  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook to use Wishlist
export const useWishlist = () => useContext(WishlistContext);
