import { Router } from "express";
import _ from "underscore";
import { Catering } from "../../db/models/catering.js";
const router = Router();

router.delete("/catering/deleteAll", async (req, res) => {
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
router.get("/", (req, res) => {
  Catering.findOne()
    .then((catering) => {
      res.json(catering);
    })
    .catch((e) => res.status(500).json({ message: "Error", error: e }));
});

// CREATE Catering
router.post("/catering/create", async (req, res) => {
  try {
    const body = req.body;
    const catering = new Catering({ ingredients: body });

    await catering.save();
  } catch (error) {
    console.log(error);
  }
});

export { router as adminRouter };
