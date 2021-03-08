import { GetServerSideProps } from "next";
import baseUrl from "../../helper/baseUrl";
import { useRef, useEffect, useState } from "react";
import DeleteModal from "../../components/DeleteModal";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Product({ product }) {
  const router = useRouter();
  const modalRef = useRef(null);
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  const [data, setData] = useState({
    quantity: 1,
  });

  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);

  const AddToCart = async () => {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({
        quantity: data.quantity,
        productId: product._id,
      }),
    });

    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" });
      Cookie.remove("user");
      Cookie.remove("token");
      router.push("/login");
    } else {
      M.toast({ html: res2.message, classes: "green" });
    }
  };

  return (
    <div className="container center-align">
      <h3>{product.name}</h3>
      <img src={product.image} style={{ width: "30%" }} />
      <h3>RS {product.price}</h3>
      <input
        type="number"
        min="1"
        value={data.quantity}
        onChange={(e) => setData({ ...data, quantity: Number(e.target.value) })}
        placeholder="Quantity"
        style={{ width: "400px", margin: "10px" }}
      />

      {user ? (
        <button
          className="btn waves-effect waves-light"
          onClick={() => AddToCart()}
        >
          Add
          <i className="material-icons right">add</i>
        </button>
      ) : (
        <button
          className="btn waves-effect waves-light"
          onClick={() => router.push("/login")}
        >
          Login To Add
          <i className="material-icons right">add</i>
        </button>
      )}

      <h5>Description: {product.description}</h5>

      {user.role !== "user" && (
        <button
          data-target="modal1"
          className="btn modal-trigger waves-effect waves-light #d32f2f red darken-2"
        >
          Delete
          <i className="material-icons left">delete</i>
        </button>
      )}

      <DeleteModal product={product} modalRef={modalRef} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params: { product },
}) => {
  const res = await fetch(`${baseUrl}/api/${product}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product: data }, // will be passed to the page component as props
  };
};
