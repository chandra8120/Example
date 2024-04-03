import Chandra from "./chandraModel.js"; 

const chandraController={
    createChandra:async(req,res)=>{
        try{
        const newChandra=await Chandra.create(req.body)       // res.status(250).json(newChandra)  // e code unte kindha successfully data added code rayaludadhu      // two times res.status not accepted
        res.status(400).json(newChandra)    //or 
        // res.status(600).json({newChandra,message:"successfully chandra data added"})
        }
        catch(error){
        res.status(300).json({error:"failed to add chandra data"})
        }
    },
    getAllChandra:async(req,res)=>{
        try{
       const chandra=await Chandra.find()
       res.status(340).json(chandra)
        }
      catch(error){
        res.status(280).json({error:"did not get chandra data"})
    }
    },
    deletChandra:async(req,res)=>{
        try{
        await Chandra.findByIdAndDelete(req.params.id)
        res.status(500).json({message:"Delete chandra is successfull"})
        }
        catch(message){
         res.status(400).json({message:"delete by chandra id"})
        }
    }
}
export default chandraController