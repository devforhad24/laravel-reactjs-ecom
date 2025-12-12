import React, { useEffect, useState } from "react";
import productImg from "../../assets/images/mens/eight.jpg";
import { apiUrl } from "./http";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  const latestProducts = async () => {
    await fetch(apiUrl + "/get-latest-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data);
        // console.log(result)
      });
  };

  useEffect(() => {
    latestProducts();
  }, []);

  return (
    <section className="section-2 pt-5">
      <div className="container">
        <h2>New Arrivals</h2>
        <div className="row mt-3">
          {products &&
            products.map((product) => {
              return (
                <div className="col-md-3 col-6" key={`product-${product.id}`}>
                  <div className="product card border-0">
                    <div className="card-img">
                      <img
                        src={product.image_url}
                        alt="productImage"
                        className="w-100"
                      />
                    </div>
                    <div className="card-body pt-3">
                      <a href="">{product.title}</a>
                      <div className="price">
                        ${product.price} &nbsp;
                        {product.compare_price && (
                          <span className="text-decoration-line-through">
                            ${product.compare_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
