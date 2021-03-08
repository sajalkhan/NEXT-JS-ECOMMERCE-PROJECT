import baseUrl from "../helper/baseUrl";
import { parseCookies } from "nookies";
import { useState } from "react";
import Total from "../components/Total";

const CartList = ({ product }) => {
  let total = 0;
  const cookie = parseCookies();
  const [cProduct, setProduct] = useState(product);

  const handleRemove = async (pid) => {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({
        productId: pid,
      }),
    });

    const res2 = await res.json();
    setProduct(res2);
  };

  return (
    <>
      {cProduct.map(
        (p) => (
          (total += p.product.price * p.quantity),
          (
            <div
              className="card"
              key={p.product._id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="card-image">
                <img src={p.product.image} />
              </div>

              <div className="card-content" style={{ width: "25vw" }}>
                <p>
                  <span className="card-title">{p.product.name}</span>
                  <span>
                    {p.quantity} x {p.product.price}
                  </span>
                  <br />
                  <button
                    className="btn"
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleRemove(p.product._id)}
                  >
                    Remove
                  </button>
                </p>
              </div>
            </div>
          )
        )
      )}
      <Total total={total} />
    </>
  );
};

export default CartList;
