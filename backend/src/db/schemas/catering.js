import { Schema } from "mongoose";

const cateringSchema = new Schema({
  ingredients: Array,
  /*
        catering has roles:
    */
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export { cateringSchema };
