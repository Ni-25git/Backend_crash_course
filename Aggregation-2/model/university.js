import mongoose from "mongoose";
import validator from "validator";

const universitySchema = mongoose.Schema({
  name: { type: String, unique: true, required: true },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  established: {
    type: Number, // Correct type for year validation
    required: true,
    validate: {
      validator: (value) => {
        return validator.isInt(String(value), {
          min: 1980, // Ensure the year is at least 1980
          max: new Date().getFullYear(), // Ensure the year is not in the future
        });
      },
      message: (props) => `${props.value} is not a valid year!`,
    },
  },
  departments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
});

const University = mongoose.model("University", universitySchema);
export default University;
