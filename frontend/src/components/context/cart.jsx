import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product, size = null) => {
    let updateCart = [...cartData];

    // if cart is empty
    if (cartData.length == 0) {
      updateCart.push({
        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
        product_id: product.id,
        size: size,
        title: product.title,
        price: product.price,
        qty: 1,
        image_url: product.image_url,
      });
    } else {
      // if size is not empty
      if (size != null) {
        const isProductExist = updateCart.find(
          (item) => item.product_id == product.id && item.size == size
        );

        // If product and size combination exist then increase qty
        if (isProductExist) {
          updateCart = updateCart.map((item) =>
            item.product_id == product.id && item.size == size
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          // If product and size combination not exist then add new item
          updateCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
            product_id: product.id,
            size: size,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url,
          });
        }
      } else {
        // When size is null
        const isProductExist = updateCart.find(
          (item) => item.product_id == product.id
        );
        if (isProductExist) {
          // when product found in cart then increase qty
          updateCart = updateCart.map((item) =>
            item.product_id == product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          // If product not exist then add new item
          updateCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
            product_id: product.id,
            size: size,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url,
          });
        }
      }
    }

    setCartData(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
  };

  const shipping = () => {
    return 0;
  };

  const subTotal = () => {
    let subtotal = 0;
    cartData.map((item) => {
      subtotal += item.qty * item.price;
    });
    return subtotal;
  };

  const grandTotal = () => {
    return subTotal() + shipping();
  };

  return (
    <CartContext.Provider
      value={{ addToCart, cartData, grandTotal, subTotal, shipping }}
    >
      {children}
    </CartContext.Provider>
  );
};
