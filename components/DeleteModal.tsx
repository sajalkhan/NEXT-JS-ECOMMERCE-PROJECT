import baseUrl from "../helper/baseUrl";
import router from 'next/router'

export default function DeleteModal({ product, modalRef }) {
  return (
    <div id="modal1" className="modal" ref={modalRef} style={{ width: "30%" }}>
      <div className="modal-content">
        <h4>{product.name}</h4>
        <strong>Are you sure you want to delete?</strong>
      </div>
      <div className="modal-footer">
        <button className="btn waves-effect waves-light #e53935 red darken-1">
          No
        </button>{" "}
        <button
          className="btn waves-effect waves-light #1e88e5 blue darken-1"
          onClick={() => deleteProduct(product._id)}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

const deleteProduct = async (id) => {
  const res = await fetch(`${baseUrl}/api/${id}`, {
      method:'DELETE'
  });
  await res.json();

  router.push('/')
};
