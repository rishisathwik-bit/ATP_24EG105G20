import exp from 'express'
import { EmployeeModel } from '../models/EmployeeModel.js';
export const empApp = exp.Router();

empApp.post('/emp',async(req,res)=>{
    const newEmp = req.body;
    const newEmpDoc = new EmployeeModel(newEmp)

    await newEmpDoc.save();
    res.status(201).json({message:"Employee created"})

});

empApp.get('/emp',async(req,res)=>{
    const empList=await EmployeeModel.find();
    if(!empList)
        return res.status(404).json({message:"No"})
    return res.status(200).json({message:"EMployees List",payload:empList});
})

empApp.put('/emp/:id',async(req,res)=>{
    const updatedemp = req.body;
    const eid = req.params.id;
    const emp=await EmployeeModel.findByIdAndUpdate(eid,{$set:{...updatedemp}},{returnDocument:"after"})
    if(emp!=null)
        return res.status(200).json({message:"EMployee modified",payload:emp})
    return res.status(404).json({message:"No employee found"})
})

empApp.delete('/emp/:id',async(req,res)=>{
    const eid =req.params.id;
    const emp=await EmployeeModel.findByIdAndDelete(eid);
    if(emp!=null)
        return res.status(200).json({message:"EMployee deleted",payload:emp})
    return res.status(404).json({message:"No employee found"})
})