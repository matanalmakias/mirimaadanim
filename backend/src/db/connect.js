import mongoose from "mongoose";
import dbConfig from "./config/db.config.js";
import { Role } from "./models/role.js";
import { Day } from "./models/day.js";

const { HOST, DB, PORT, ROLES, DAYS } = dbConfig;

const connect = async () => {
  //mongoose 7 update:
  mongoose.set("strictQuery", false);
  await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);
  console.log(`Succesfully connected to the database ${DB}`);
  initDB();
};

const initDB = () => {
  //save without joi
  //if Day collection is Empty:
  Day.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      DAYS.map((s) => new Day({ name: s })).forEach((day) => {
        day.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added ", day.name, "to Days collection");
          }
        });
      });
    }
  });
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ROLES.map((s) => new Role({ name: s })).forEach((role) => {
        role.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added ", role.name, "to Roles collection");
          }
        });
      });
    }
  });
};

const initDB2 = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      const roles = ROLES.map((r) => new Role({ name: r }));

      //dont use forEach with await
      for (let role of roles) {
        await role.save();
        console.log("added ", role.name, "to Roles collection");
      }
    }
  } catch (e) {
    console.log("Failed with error: ", e);
  }
};
export { connect };
