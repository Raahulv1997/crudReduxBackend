import express from "express";
import {
  CreateStudent,
  GetStudentById,
  UpdateStudent,
  deleteStudent,
  getAllStudent,
} from "../controller/StudentController.js";

import path from "path";
import multer from "multer";

// Serve static files from the "src/upload" directory
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/"); // Specify the destination folder for the zip file
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const StudentRouter = express.Router();

StudentRouter.post("/create", upload.single("profileImage"), CreateStudent);
StudentRouter.get("/getallStudent", getAllStudent);
StudentRouter.post("/studentById", GetStudentById);
StudentRouter.put("/studentUpdate", UpdateStudent);
StudentRouter.post("/deleteStudent", deleteStudent);
export default StudentRouter;
