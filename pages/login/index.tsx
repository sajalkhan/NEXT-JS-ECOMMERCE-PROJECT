import Link from "next/link";
import { useState } from "react";
import baseUrl from '../../helper/baseUrl'
import {useRouter} from 'next/router'
import cookie from 'js-cookie'

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const router = useRouter();

  const userLogin = async (e)=> {
    e.preventDefault();

    const res = await fetch(`${baseUrl}/api/login`,
    {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
    });

    const res2 = await res.json();

    if (res2.error) {
        M.toast({ html: res2.error, classes: "red" });
      } else {
        cookie.set('token', res2.token);
        cookie.set('user', res2.user);
        router.push('/account');
    }

  }

  return (
    <div className="container center-align" style={{padding:'100px 0px 0px 0px'}}>
      <h3>Login</h3>
      <form onSubmit={(e)=>userLogin(e)} style={{width:'50%', margin:'0 auto'}}>
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Login
          <i className="material-icons right">forward</i>
        </button>

        <Link href="/signup">
          <a>
            <h5>Don't have a account?</h5>
          </a>
        </Link>
      </form>
    </div>
  );
}
