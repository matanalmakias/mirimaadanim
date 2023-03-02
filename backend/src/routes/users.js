import { Router } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";
import _ from "underscore";
import { User } from "../db/models/user.js";
import { validateSignUp } from "../middleware/user/verifySignupBody.js";
import { userAlreadyExists } from "../middleware/user/userAlreadyExists.js";
import { validateToken } from "../middleware/user/validateToken.js";
import { isManager } from "../middleware/roles/isManager.js";
import bcrypt from "bcryptjs";
import { validateSignIn } from "../middleware/user/verifySignInBody.js";
import { Role } from "../db/models/role.js";
import nodeEvents from "../nodeEvents/nodeEvents.js";
const router = Router();

// --------- Edit Password --------

router.post("/editPassword", validateToken, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: ".הסיסמא חייבת להכיל לפחות 8 תווים" });
    }
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: ".המשתמש לא נמצא במערכת." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return res.json({ message: "אין שינוי, שלחת אותו סיסמא." });
    }

    user.password = await bcrypt.hash(password, 12);
    await user.save();
    await res.json({ message: "הסיסמא עודכנה בהצלחה.", id: user._id });
    return nodeEvents.emit("update");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// <--------- Edit Email --------->
router.post("/editEmail", validateToken, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "אימייל חובה" });
    }
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }
    if (email === user.email) {
      return await res.json({ message: "אין שינוי, שלחת אותו אימייל." });
    }
    user.email = email;
    await user.save();
    await res.json({ message: "האימייל עודכן בהצלחה." });
    return nodeEvents.emit("update");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --------- Delete All Users ---------
router.delete("/deleteAll", validateToken, isManager, async (req, res) => {
  try {
    await User.deleteMany({});
    await res.json({ message: `All users are deleted!` });
    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error.message);
  }
});

// GET Self USER
router.get("/getSelfUser", validateToken, async (req, res) => {
  User.findOne({ _id: req.userId })
    .then((user) => {
      res.json(user);
    })
    .catch((e) => res.status(500).json({ message: "Error", error: e }));
});
// GET All USERS
router.get("/", (req, res) => {
  User.findOne()
    .then((user) => {
      res.json(user);
    })
    .catch((e) => res.status(500).json({ message: "Error", error: e }));
});

//api/auth/signup
router.post("/signup", validateSignUp, userAlreadyExists, async (req, res) => {
  try {
    const body = _.pick(req.body, "username", "email", "password");

    body.password = await bcrypt.hash(body.password, 12);
    const user = new User(body);

    //before saving the user:
    //for each user -> save the role id of user
    user.roles = [(await Role.findOne({ name: "user" }))._id];
    user.cart = [];
    user.workers = [];
    await user.save();
    await res.json({ message: "user saved", id: user._id });
    return nodeEvents.emit("update");
  } catch (e) {
    return res.status(500).json({ message: "Server DB Error", error: e });
  }
});

router.post("/signin", validateSignIn, async (req, res) => {
  //email and password:
  try {
    //SELECT * FROM user JOIN Roles ON ...
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!user) {
      return res.status(401).json({ message: "No Such User" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: "30d",
    });

    const authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push(`ROLE_` + user.roles[i].name.toUpperCase());
    }

    await res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
    return nodeEvents.emit("update");
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e });
  }
});

export { router as authRouter };
