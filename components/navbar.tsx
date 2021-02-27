import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Cookie from "js-cookie";

const NavBar = () => {
  const router = useRouter();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  const isActive = (route) => {
    return route == router.pathname ? "active" : "";
  };

  return (
    <nav>
      <div className="nav-wrapper #42a5f5 blue lighten-1">
        <Link href="/">
          <a className="brand-logo left">MyStore</a>
        </Link>

        <ul id="nav-mobile" className="right">
          <li className={isActive("/cart")}>
            <Link href="/cart">
              <a>Cart</a>
            </Link>
          </li>
          {(user.role == "admin" || user.role == "root") && (
            <li className={isActive("/create")}>
              <Link href="/create">
                <a>Create</a>
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li className={isActive("/account")}>
                <Link href="/account">
                  <a>Account</a>
                </Link>
              </li>

              <li>
                <button
                  className="btn red"
                  onClick={() => {
                    Cookie.remove("token");
                    Cookie.remove("user");
                    router.push("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={isActive("/login")}>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>

              <li className={isActive("/signup")}>
                <Link href="/signup">
                  <a>Signup</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
