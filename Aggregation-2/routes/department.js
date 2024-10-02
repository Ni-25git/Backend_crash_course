import express from 'express';
import { addDepartment, deleteDepartment, updateDepartment } from '../controller/department.js';

const router=express.Router();

router.post('/',addDepartment)
router.patch('/',updateDepartment)
router.delete("/",deleteDepartment)


export default router;