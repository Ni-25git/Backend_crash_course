import Department from "../model/department.js";

export const addDepartment=async(req,res)=>{
    try {
        const department=new Department(req.body);
        await department.save();
        res.status(201).send({message:"successfully added department",department: department});
        
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

export const updateDepartment = async (req,res) => {
    try {
        const {departmentId}=req.body
        await Department.findByIdAndUpdate(departmentId, req.body, { new: true });
        console.log('Department updated successfully.');
        res.status(200).send({message: "Department updated successfully!"});
        
    } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).send({error: error.message});
    }
};

export const deleteDepartment = async () => {
    try {
        const { departmentId } = req.body;
        const department = await Department.findById(departmentId);
        if (department) {
            await Course.deleteMany({ department: departmentId });
            await Department.findByIdAndDelete(departmentId);
            console.log('Department and associated courses deleted successfully.');
            res.status(200).send({ message: "Department and associated courses deleted successfully!" });
        }
    } catch (error) {
        console.error('Error deleting department:', error);
        res.status(500).send({ error: error.message });
    }
};