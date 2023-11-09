import express from "express";
import { DbConfigFuntion } from "./src/config/DbConfig.js";
import "dotenv/config";
import StudentRouter from "./src/router/StudentRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(cors());
DbConfigFuntion();

app.use(express.json({ limit: "90mb" }));
app.use(bodyParser.json());
// to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use(express.static("public"));
app.use(StudentRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
