import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import baseUrl from "../../helper/baseUrl";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const Cart = ({ error }) => {
  const router = useRouter();
  if (error) {
    M.toast({ html: error, classes: "red" });
    cookie.remove("user");
    cookie.remove("token");
    router.push("/login");
  }

  return <div>Cart</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      props: { product: {} },
    };
  }
  const res = await fetch(`${baseUrl}/api/cart`, {
    headers: {
      Authorization: token,
    },
  });

  const products = await res.json();
  if (products.error) {
    return {
      props: { error: products.error },
    };
  }
  console.log("products -- ", products);
  return {
    props: { product: products },
  };
};

export default Cart;
