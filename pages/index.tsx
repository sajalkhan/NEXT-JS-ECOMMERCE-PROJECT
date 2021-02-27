import { GetStaticProps } from "next";
import ProductList from "../components/ProductList";
import baseUrl from '../helper/baseUrl';

const Home = ({ product }) => {
  return (
    <div className="rootCard">
      <ProductList product={product} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product: data.products }, // will be passed to the page component as props
  };
};

export default Home;
