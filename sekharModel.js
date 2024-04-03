import {Schema,model} from 'mongoose'

const sekharSchema=new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    comment:{type:String,required:false}
})
const Sekhar=model("Sekhar",sekharSchema)
export default Sekhar