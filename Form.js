import Form from './formModel.js'

const formController={
    createForm:async(req,res)=>{
        try{
       const newForm=await Form.create(req.body)
       res.status(300).json(newForm)
        }
        catch(error){
      res.status(500).json({error : "Internal server error"})
      }
    },
    getForm:async(req,res)=>{
        try{
        const forms=await Form.find()
        res.status(230).json(forms)
        }
        catch(error){
       res.status(240).json({error : "failed to get the data"})
        }
    },
    deleteForm:async(req,res)=>{
        try{
        await Form.findByIdAndDelete(req.params.id)
        res.status(370).json({error:"delete form successfully"})
        }
        catch(error){
        res.status(240).json({error:"failed to delete form "})
        }
    }
}
export default formController