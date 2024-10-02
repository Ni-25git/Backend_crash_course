import Course from "../model/course.js";
import Department from "../model/department.js";

export const addCourses = async (req,res)=>{
    try{
        
        const course = new Course(req.body);
        await course.save();
        res.status(201).json({Message:"Course saved successfully",course: course});
      
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'Server error',err});
    }
}

export const listCourses = async (req,res) => {
    try {
        const {departmentId,semter}=req.body
        const courses = await Course.aggregate([
            { $match: { department: mongoose.Types.ObjectId(departmentId), semter: semter}},
            { $lookup: {
                from: 'departments',
                localField: 'department',
                foreignField: '_id',
                as: 'department_info'
            }},
            { $unwind: '$department_info' }
        ]);
        console.log('Courses:', courses);
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error listing courses:', error);
        res.status(500).json({ error: 'Server error', err });
    }
};

export const getCourseDetails = async (req,res) => {
    try {
        const {courseId}=req.body
        const course = await Course.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(courseId) }},
            { $lookup: {
                from: 'departments',
                localField: 'department',
                foreignField: '_id',
                as: 'department_info'
            }},
            { $unwind: '$department_info' },
            { $lookup: {
                from: 'universities',
                localField: 'department_info.university',
                foreignField: '_id',
                as: 'university_info'
            }},
            { $unwind: '$university_info' }
        ]);
        console.log('Course Details:', course);
        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching course details:', error);
        res.status(500).json({ error: 'Server error', err });
    }
};

export const updateCourse = async (req,res) => {
    try {
        const {courseId}=req.body
        await Course.findByIdAndUpdate(courseId, req.body, { new: true });
        console.log('Course updated successfully.');
        res.status(200).json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: 'Server error', err });
    }
};

export const deleteCourse = async (req,res) => {
    try {
        const {courseId, departmentId}=req.body
        await Course.findByIdAndDelete(courseId);
        await Department.findByIdAndUpdate(departmentId, { $pull: { courses: courseId } });
        console.log('Course deleted successfully.');
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: 'Server error', err });
    }
};