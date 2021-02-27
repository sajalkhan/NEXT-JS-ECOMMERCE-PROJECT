import { GetServerSideProps } from "next";
import baseUrl from "../../helper/baseUrl";
import { useRef, useEffect } from "react";
import DeleteModal from "../../components/DeleteModal";
import { parseCookies } from "nookies";

export default function Product({ product }) {
  const modalRef = useRef(null);
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);

  return (
    <div className="container center-align">
      <h3>{product.name}</h3>
      <img src={product.image} style={{ width: "30%" }} />
      <h3>RS {product.price}</h3>
      <input
        type="number"
        min="1"
        placeholder="Quantity"
        style={{ width: "400px", margin: "10px" }}
      />

      <button className="btn waves-effect waves-light">
        Add
        <i className="material-icons right">add</i>
      </button>

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
