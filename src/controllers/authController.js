const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { success, error } = require("../utils/response");


exports.register = async (req, res) => {
  try {
    
    console.log("Request Body:", req.body);
       const { name, email, password } = req.body;

   
    if (!name || !email || !password) {
      return error(res, "All fields are required", 400);
    }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return error(res, "Invalid email format", 400);
    }

        if (password.length < 6) {
      return error(res, "Password must be at least 6 characters", 400);
    }

        const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return error(res, "Email already registered", 400);
    }

   
    const hashed = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashed,
    });

    return success(res, "User registered successfully");

  } catch (err) {
    return error(res, "Registration failed");
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return error(res, "Email and password are required", 400);
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return error(res, "Invalid credentials", 400);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return error(res, "Invalid credentials", 400);

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } 
        );

    return success(res, "Login successful", { token });

  } catch (err) {
    return error(res, "Login failed");
  }
};

