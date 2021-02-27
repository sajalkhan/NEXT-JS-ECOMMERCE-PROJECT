import jwt from "jsonwebtoken";
import Cart from "../../model/cart";

export default async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "you must logged in" });
  }

  try {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    const cart = await Cart.findOne({ user: userId });
    res.status(200).json(cart.products);
  } catch (error) {
    return res.status(401).json({ error: "you must logged in" });
  }
};
