const Instructor = require('../model/Instructor');

exports.getInstructor=async(req,res)=>{
try{
const instructors = await Instructor.find()
    res.json(instructors)
}catch(err){
res.status(500).json({error:"Server Error"})
}
}

exports.createInstructor=async(req,res)=>{
    try{
        const {name,email} = req.body;
        
        if(!name || !email){
            res.status(400).json({error:"Name and Email Id is Required"})
        }
        
        const newInstructor = new Instructor({name,email})
        await newInstructor.save()
        res.status(201).json(newInstructor)
    }catch(err){
    res.status(500).json({error:"Server Error"})
    }
}

exports.updateInstructor=async(req,res)=>{
    try{
        const {id} = req.params;        
        const updated = await Instructor.findByIdAndUpdate(id,req.body,{new:true})
        if(!updated ){
            res.status(400).json({error:"Instructor not Found"})
        }
        res.json(updated)
    }catch(err){
    res.status(500).json({error:"Server Error"})
    }
}
exports.deleteInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Instructor.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Instructor not found" });
        }

        res.json({ message: "Instructor deleted" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};