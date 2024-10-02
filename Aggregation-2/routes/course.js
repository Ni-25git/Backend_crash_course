import express from 'express';
import { addCourses, deleteCourse, getCourseDetails, listCourses, updateCourse } from '../controller/couser.js';


const router=express.Router();

router.post('/',addCourses)
router.get('/',listCourses)
router.get('/',getCourseDetails)
router.patch('/',updateCourse)
router.delete('/',deleteCourse)



export default router;