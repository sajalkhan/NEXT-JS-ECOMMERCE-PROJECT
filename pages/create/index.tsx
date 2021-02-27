import { useState } from "react";
import baseUrl from "../../helper/baseUrl";
import imageUpload from "../../helper/uploadImage";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const Create = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mediaUrl = await imageUpload(data.image);

      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          image: mediaUrl,
          description: data.description,
        }),
      });

      const res2 = await res.json();

      if (res2.error) {
        M.toast({ html: res2.error, classes: "red" });
      } else {
        M.toast({ html: `Product Created Successfully!`, classes: "green" });
      }
    } catch (error) {
      console.log("error-- ", error);
    }
  };

  return (
    <form
      className="container"
      onSubmit={(e) => handleSubmit(e)}
      style={{ width: "50%", margin: "0 auto", padding: "100px 0px 0px 0px" }}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        type="text"
        name="price"
        placeholder="Price"
        value={data.price}
        onChange={(e) => setData({ ...data, price: e.target.value })}
      />

      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <img
        className="responsive-img"
        src={data.image ? URL.createObjectURL(data.image) : ""}
        alt=""
      />

      <textarea
        className="materialize-textarea"
        name="description"
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      ></textarea>

      <button
        className="btn waves-effect waves-light"
        type="submit"
        name="action"
      >
        Submit
        <i className="material-icons right">send</i>
      </button>
    </form>
  );
};

export default Create;

//protected route
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = parseCookies(ctx);
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  if (user.role !== "admin") {
    const { res } = ctx;
    res.writeHead(302, { Location: "/" });
    res.end();
  }

  return {
    props: {},
  };
};
