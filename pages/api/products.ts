import type { NextApiRequest, NextApiResponse } from "next";
import initDB from "../../helper/initDB";
import Product from "../../model/productModel";

initDB();

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getAllProduct(res, res);
      break;
    case "POST":
      await saveProduct(req, res);
      break;
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({ products: product });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const saveProduct = async (req, res) => {
  const { name, price, image, description } = req.body;

  try {
    if (!name || !price || !image || !description) {
      return res.status(422).json({ error: "please add all the fields" });
    }

    const product = await new Product({
      name,
      price,
      image,
      description,
    }).save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
