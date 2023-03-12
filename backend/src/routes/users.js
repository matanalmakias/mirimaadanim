import { Router } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";
import _ from "underscore";
import { User } from "../db/models/user.js";
import { Role } from "../db/models/role.js";
import { validateToken } from "../middleware/user/validateToken.js";
import { isManager } from "../middleware/roles/isManager.js";
import bcrypt from "bcryptjs";
import nodeEvents from "../nodeEvents/nodeEvents.js";
import twilio from "twilio";
const router = Router();
const accountSid = "AC07d9ac2a1ce71f3d35d5e47dd69d32df";
const authToken = "2cedbe6bae41b7bf5f9fe28a967bc0cb";
const myTwilioPhone = `+15673623348`;
const client = twilio(accountSid, authToken);

// <<------------ Get Self Use ------------->>

// <<----------- SMS send ------------>>
router.post("/send/:phoneNum", validateToken, async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNum;
    const formattedPhoneNumber = "+972" + phoneNumber.replace(/^0+/, "");
    client.messages
      .create({
        body: "Hello from Node.js!",
        from: "+15673623348",
        to: formattedPhoneNumber,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
});
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
    res.json({ message: "הסיסמא עודכנה בהצלחה.", id: user._id });
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
    res.json({ message: "האימייל עודכן בהצלחה." });
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

// < -------------- Final Login ---------------- >
router.post("/finalLogin/:phoneNum/:verfCode", async (req, res) => {
  //email and password:

  const body = req.body;
  let phoneNum = req.params.phoneNum;
  const verfCode = req.params.verfCode;
  let verfCodeAsNumber = parseInt(verfCode);
  phoneNum.replace(/^0/, ""); // Remove leading zero
  const user = await User.findOne({ phoneNumber: phoneNum }).populate("roles");

  if (user.isComplete === false) {
    user.address = {}; // Initialize the address object
    user.address.city = body.city;
    user.address.street = body.street;
    user.address.houseNumber = body.houseNumber;
    user.address.floor = body.floor;
    user.isComplete = true;
    await user.save();
  }
  if (user.verficationCode === verfCodeAsNumber) {
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: "30d",
    });
    const authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push(`ROLE_` + user.roles[i].name.toUpperCase());
    }
    res.status(200).json({
      id: user.id,
      phoneNumer: `${phoneNum}`,
      roles: authorities,
      accessToken: token,
    });
    return nodeEvents.emit("update");
  } else {
    throw new Error("Invalid verification code");
  }
});
//<-----------Login Try HERE --------------->
router.post("/tryLogin/:phoneNum", async (req, res) => {
  try {
    const phoneNum = req.params.phoneNum;

    const formattedPhoneNumber = "+972" + phoneNum.replace(/^0+/, "");
    const user = await User.findOne({ phoneNumber: phoneNum });

    let isRegistered = false;
    let randomNumber = Math.floor(100000 + Math.random() * 900000);
    if (user !== null) {
      user.verficationCode = randomNumber;
      await user.save();
      isRegistered = true;
    }
    if (user === null) {
      const role = await Role.findOne({ name: "user" });
      const newUser = new User({
        phoneNumber: phoneNum,
        verficationCode: randomNumber,
        roles: [role],
      });

      await new Promise(async (resolve, reject) => {
        newUser.save(async (error, savedUser) => {
          if (error) {
            reject(error);
          } else {
            isRegistered = true;

            resolve(savedUser);
          }
        });
      });
    }
    if (isRegistered === true) {
      client.messages
        .create({
          body: `הקוד שלך הוא ${randomNumber}`,
          from: myTwilioPhone,
          to: formattedPhoneNumber,
        })
        .then((message) => {
          res.json({ message: `הקוד נשלח לנייד` });
          return nodeEvents.emit("update");
        })
        .catch((error) => console.log(error));
    }
  } catch (e) {
    return res.status(500).json({ message: "Server DB Error", error: e });
  }
});

export { router as authRouter };
