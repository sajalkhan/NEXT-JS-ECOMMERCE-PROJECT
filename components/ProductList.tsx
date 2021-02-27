import Link from "next/link";

const ProductList = ({ product }) => {
  return product.map((p) => (
    <div className="card" key={p._id}>
      
      <div className="card-image">
        <img src={p.image} />
        <span className="card-title">{p.name}</span>
      </div>
      
      <div className="card-content">
        <p>RS {p.price}</p>
      </div>

      <div className="card-action">
        <Link href={"/product/[product]"} as={`/product/${p._id}`}>
          <a>View Product</a>
        </Link>
      </div>
    </div>
  ));
};

export default ProductList;
