const imageUpload = async (image) => {
  const formdata = new FormData();
  formdata.append("file", image);

  //----------------- upload image to cloudinary -----------------
  formdata.append("upload_preset", "myStore");
  formdata.append("cloud_name", "sajal-cnq");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/sajal-cnq/image/upload",
    {
      method: "POST",
      body: formdata,
    }
  );
  //----------------- upload image to cloudinary -----------------

  const res2 = await res.json();
  return res2.url;
};

export default imageUpload;
