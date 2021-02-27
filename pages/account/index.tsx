import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

const Account = () => {
  return (
    <div className="container center-align">
      <h3>Account</h3>
    </div>
  );
};

//protected route
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  return {
    props: {},
  };
};

export default Account;
