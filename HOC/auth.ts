import jwt from "jsonwebtoken";

const Authenticated = (component) => {
  return (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "you must logged in" });
    }

    try {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      req.userId = userId;
      return component(req, res);
    } catch (error) {
      return res.status(401).json({ error: "you must logged in" });
    }
  };
};

export default Authenticated;
