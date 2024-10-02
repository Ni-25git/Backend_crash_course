import mongoose from "mongoose";
import validator from "validator";

const courseSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    credits: { 
        type: Number, 
        required: true,
        validate: {
            validator: function (v) {
                return v > 0; // Ensure credits are positive
            },
            message: props => `${props.value} must be a positive number!`
        }
    },
    semester: { type: String, required: true }, // E.g., Fall, Spring
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
});

const Course = mongoose.model('Course',courseSchema);
export default Course;