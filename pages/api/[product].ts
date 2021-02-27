import Product from "../../model/productModel";
import initDB from "../../helper/initDB";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  const { product } = req.query;
  const data = await Product.findOne({ _id: product });
  res.status(200).json(data);
};

const deleteProduct = async (req, res) => {
  const { product } = req.query;
  await Product.findOneAndDelete({ _id: product });
  res.status(200).json({});
};
