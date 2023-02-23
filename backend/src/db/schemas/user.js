import { Schema } from "mongoose";

const cartSchema = new Schema({});

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  cart: [],
  /*
        user has roles:
    */
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export { userSchema };
