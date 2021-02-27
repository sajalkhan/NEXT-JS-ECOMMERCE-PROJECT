import { useState } from "react";
import Link from "next/link";
import baseUrl from '../../helper/baseUrl'
import {useRouter} from 'next/router'

export default function Login() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const userSignUp = async (e)=> {
    e.preventDefault();

    const res = await fetch(`${baseUrl}/api/signup`,
    {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      }),
    });

    const res2 = await res.json();

    if (res2.error) {
        M.toast({ html: res2.error, classes: "red" });
      } else {
        M.toast({ html: res2.message, classes: "green" });
        router.push('/login');
    }

  }

  return (
    <div className="container center-align" style={{padding:'100px 0px 0px 0px'}}>
      <h3>SignUp</h3>
      <form onSubmit={(e)=>userSignUp(e)} style={{width:'50%', margin:'0 auto',}}>
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
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
          signup
          <i className="material-icons right">forward</i>
        </button>

        <Link href="/login">
          <a>
            <h5>Already have a account?</h5>
          </a>
        </Link>
      </form>
    </div>
  );
}
