import initDB from "../../helper/initDB";
import User from "../../model/userModel";
import Cart from "../../model/cart";
import bcrypt from "bcryptjs";

initDB();

export default async (req, res) => {
  const { name, email, password } = JSON.parse(req.body);

  try {
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please Add all the fields" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ error: "user already exists with this email" });
    }

    const hasPassword = await bcrypt.hash(password, 16);
    const newUser = await new User({
      name,
      email,
      password: hasPassword,
    }).save();

    await new Cart({ user: newUser._id }).save();

    console.log(newUser);
    res.status(201).json({ message: "signup success" });
  } catch (error) {}
};
