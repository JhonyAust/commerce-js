// contexts/ProductContext.js

import React, { createContext, useState, useEffect } from 'react';
import commerce from '../lib/commerce';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // products state
  const [products, setProducts] = useState([]);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await commerce.products.list();
        console.log("API Response:", response);

        // Check if data is available
        const data = response.data;
        if (data) {
          setProducts(data);
          console.log("Products after setProducts:", data);
        } else {
          console.error("Invalid product data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Make sure to pass an empty dependency array to run the effect only once

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
