import University from "../model/university.js"

export const addUniversity=async(req,res)=>{
    try {
        const response=new University(req.body)
        await response.save();
        res.status(200).send({"msg":"university added successfully","university":response})
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

export const updateUniversity = async (req,res) => {
    try {
        const{universityId}=req.body
        await University.findByIdAndUpdate(universityId, req.body, { new: true });
        console.log('University updated successfully.');
        res.status(200).send({"msg":"university updated successfully","university":response})
    } catch (error) {
        console.error('Error updating university:', error);
        res.status(500).send({ error: error.message });
    }
};

export const getUniversitiesWithCourseCode = async () => {
    try {
        const {courseCode}=req.body
        const universities = await University.aggregate([
            { $lookup: {
                from: 'departments',
                localField: '_id',
                foreignField: 'university',
                as: 'departments'
            }},
            { $unwind: '$departments' },
            { $lookup: {
                from: 'courses',
                localField: 'departments._id',
                foreignField: 'department',
                as: 'courses'
            }},
            { $unwind: '$courses' },
            { $match: { 'courses.code': courseCode } },
            { $group: { _id: '$_id', name: { $first: '$name' }, departments: { $push: '$departments.name' } }}
        ]);
        console.log('Universities offering the course:', universities);
        res.status(200).send({"msg":"universities offering the course","universities":universities})
    } catch (error) {
        console.error('Error retrieving universities:', error);
        res.status(500).send({ error: error.message });
    }
};