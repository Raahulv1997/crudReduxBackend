import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: String, required: true },
  mobile: { type: Number, required: true },
  profileImage: { type: String },
});

const StudentModel = mongoose.model("students", StudentSchema);
export default StudentModel;
