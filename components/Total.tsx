export default function Total({ total }) {
  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <h5>Total ${total}</h5>
      <button className="btn">Checkout</button>
    </div>
  );
}
