import { NextApiHandler } from "next";
import cookie from "cookie";

const authComplete: NextApiHandler = (req, res) => {
  const token = req.query.token;

  if (token) {
    const authCookie = cookie.serialize("token", token as string, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 1000 * 60 * 24 * 30,
      sameSite: "strict",
    });
    res.setHeader("set-cookie", authCookie);
  }

  res.redirect("/");
};

export default authComplete;
