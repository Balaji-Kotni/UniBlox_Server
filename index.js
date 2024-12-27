import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import sequelize from "./db.js";
import { routes } from "./routes/index.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origins: ["http://localhost:3000"],
  })
);

const genralRatelimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // Limit each IP to 1000 requests per minute
  message: "Too many requests from this IP, please try again after a minute.",
});

app.use(genralRatelimit);

// sequelize.sync({
//   force: true,
// });
sequelize.sync();

//Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Uniblox Api." });
});
app.use("/api/v1", routes);

app.use((req, res, next) => {
  next(new RequestError("Invalid route", 404));
});

const PORT = process.env.PORT || 8000;

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch(error => {
    console.log("error", error);
  });
