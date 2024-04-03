import { Schema,model } from "mongoose"

const formSchema=new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    username:{type:String,required:true}
})
const Form=model("Form",formSchema)
export default Form