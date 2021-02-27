import initDb from "../../helper/initDB";
import User from "../../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

initDb();

export default async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please Add all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "user don't exists with this email" });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const { name, email, role } = user;
      res.status(201).json({ token, user: { name, role, email } });
    } else {
      res.status(401).json({ error: "Email or password don't match" });
    }
  } catch (error) {}
};
