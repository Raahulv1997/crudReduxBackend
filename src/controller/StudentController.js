import { StatusCodes } from "http-status-codes";
import StudentModel from "../model/StudentSchema.js";

export const CreateStudent = async (req, res) => {
  var profileImage;
  var { name, email, age, mobile } = req.body;
  console.log("fileee---" + typeof req.file);

  if (req.file != undefined) {
    profileImage = "http://localhost:1000/upload/" + req.file.filename; // Corrected line
  } else {
    profileImage = "";
  }

  if (!name || !email || !age || !mobile) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "please fill the data" });
  }

  try {
    const preStudent = await StudentModel.findOne({ email: email });
    if (preStudent) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Student already exist" });
    } else {
      const student = new StudentModel({
        name,
        email,
        age,
        mobile,
        profileImage,
      });

      const savedStudnet = await student.save();
      res.status(StatusCodes.CREATED).json(savedStudnet);
    }
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export const getAllStudent = async (req, res) => {
  try {
    const findStudent = await StudentModel.find();
    res.status(StatusCodes.OK).json(findStudent);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Some thin went wrong" });
  }
};

export const GetStudentById = async (req, res) => {
  try {
    const { id } = req.body;
    const StudentById = await StudentModel.findById({ _id: id });

    if (StudentById) {
      res.status(StatusCodes.OK).json(StudentById);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Student not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Some thin went wrong" });
  }
};

export const UpdateStudent = async (req, res) => {
  try {
    const { _id, name, email, age, mobile, profileImage } = req.body;
    const updateduser = await StudentModel.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        age,
        mobile,
        profileImage,
      },
      {
        new: true,
      }
    );

    if (!updateduser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Student not found" });
    }

    res.status(StatusCodes.OK).json({ message: "user Udated" });
  } catch (error) {
    console.error("Error updating student:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export async function deleteStudent(req, res) {
  try {
    const { id } = req.body;
    let deleteRes = await StudentModel.findByIdAndDelete({ _id: id });
    res.status(StatusCodes.OK).json({ message: "User deleted" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Some thin went wrong" });
  }
}
