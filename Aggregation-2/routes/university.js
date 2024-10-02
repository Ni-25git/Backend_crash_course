import express from 'express';
import { addUniversity, getUniversitiesWithCourseCode, updateUniversity } from '../controller/university.js';

const router= express.Router();

router.post("/",addUniversity)
router.get("/",getUniversitiesWithCourseCode)
router.patch("/",updateUniversity)




export default router;