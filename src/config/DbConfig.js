import mongoose from "mongoose";
import "dotenv/config";

export function DbConfigFuntion() {
  mongoose.connect(process.env.DB_URl);
  const Dbconnection = mongoose.connection;
  Dbconnection.once("connected", () => {
    console.log("connected with Database ");
  });
  Dbconnection.on("error", () => {
    console.log("Error in connection with database");
  });
}
