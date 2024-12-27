import Users from "../models/users.js";
import JWT from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = JWT.sign(
      {
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
      process.env.JWT_SECRET
    );

    const userWithoutPassword = { ...user.dataValues };
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
