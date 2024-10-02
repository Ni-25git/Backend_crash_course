import mongoose from "mongoose";
import validator from "validator";

const departmentSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    faculty: { type: String, required: true },
    established_year: { 
        type: Number, 
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{4}$/.test(v) && v <= new Date().getFullYear(); // Ensure year is valid and not in the future
            },
            message: props => `${props.value} is not a valid established year!`
        }
    },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] // Array of course ObjectIDs
});
const Department=mongoose.model("Department",departmentSchema);

export default Department;