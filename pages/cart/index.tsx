import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import baseUrl from "../../helper/baseUrl";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import CartList from "../../components/CartList";

const Cart = ({ error, product }) => {
  const { token } = parseCookies();
  const router = useRouter();

  if (!token) {
    return (
      <div className="center-align">
        <h3>Please login to view your cart</h3>
        <Link href="/login">
          <a className="btn #1565c0 blue darken-3">Login</a>
        </Link>
      </div>
    );
  }
  if (error) {
    M.toast({ html: error, classes: "red" });
    cookie.remove("user");
    cookie.remove("token");
    router.push("/login");
  }

  return (
    <div>
      <CartList product={product} />
    </div>
  );
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
