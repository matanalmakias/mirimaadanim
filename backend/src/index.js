import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connect } from "./db/connect.js";
import { notFound } from "./middleware/not-found.js";
import { authRouter } from "./routes/users.js";
import { Server } from "socket.io";
import nodeEvents from "./nodeEvents/nodeEvents.js";
import { adminRouter } from "./routes/catering/admin.js";
import { cateringRouter } from "./routes/catering/catering.js";

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
app.use("/api/admin", adminRouter);
app.use("/api/catering", cateringRouter);

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
