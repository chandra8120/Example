import Practise from "./practiseModel.js";
import multer from 'multer'

const storage=multer.memoryStorage()
const upload=multer({storage:storage})

const practiseController={
    createPractise:[
        upload.single('image'),
     async(req,res)=>{
        try{
        const {name,price}=req.body

        if(!req.file){
         return   res.status(200).json({message:"required field image"})
        }
        const image=req.file.buffer.toString('base64')
       if(!name ||!price){
       return res.status(300).json({message:"required fields name price"})
       }
        const newPractise=new Practise({name,price,image})
        const savedPractise=await newPractise.save()
      
         res.status(201).json({savedPractise,message:"practise data added successfully"})

        }
        catch(error){
            res.status(500).json({error:"failed to add practise data"})
        }
    }
],
getPractise:async(req,res)=>{
    try{
    const practise=await Practise.find()
    res.status(201).json(practise)
    }
    catch(error){
        res.status(500).json({error:"Failed to get the data"})
    }
},

deletePractise:async(req,res)=>{
    try{
   await Practise.findByIdAndDelete(req.params.name)
     res.status(300).json({message:"deleted successfully"})
    }
    catch(error){
        res.status(500).json({error:"Failed to delete practise"})
    }
}
     
}
export default practiseController