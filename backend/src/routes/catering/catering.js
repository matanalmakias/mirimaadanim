import { Router } from "express";

import _ from "underscore";
import { Catering } from "../../db/models/catering.js";

const router = Router();

router.delete("/deleteAll", async (req, res) => {
  try {
    await Catering.deleteMany({});
    res.json({ message: `All caterings are deleted!` });
  } catch (error) {
    console.log(error.message);
  }
});

// GET single cateringS
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Catering.findOne({ _id: id })
    .then((catering) => {
      res.json(catering);
    })
    .catch((e) => res.status(500).json({ message: "Error", error: e }));
});
// GET All cateringS
router.get("/", async (req, res) => {
  try {
    const caterings = await Catering.find({});
    console.log(caterings);
    res.send(caterings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// CREATE Catering
router.post("/create", (req, res) => {
  try {
    const body = req.body;
    console.log(body);
  } catch (error) {
    console.log(error);
  }
});

export { router as cateringRouter };
