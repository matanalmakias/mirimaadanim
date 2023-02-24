import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connect } from "./db/connect.js";
import { notFound } from "./middleware/not-found.js";
import { authRouter } from "./routes/users.js";
import { Server } from "socket.io";
import nodeEvents from "./nodeEvents/nodeEvents.js";
import { managerRouter } from "./routes/catering/manager.js";
import { productRouter } from "./routes/catering/product.js";
import { cartRouter } from "./routes/cart.js";
import { categoryRouter } from "./routes/categories.js";

const app = express();

//once app starts: connect to db: and fill the roles collection
connect().catch((e) => {
  console.log(e);
});

//middlewares:
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

//routes:
app.use("/api/auth", authRouter);
app.use("/api/manager", managerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/category", categoryRouter);

//404:
app.use(notFound);

const PORT = 3001;
const server = app.listen(PORT, () =>
  console.log(`HTTP server running on port ${PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

nodeEvents.on("update", () => {
  io.emit("update");
});
