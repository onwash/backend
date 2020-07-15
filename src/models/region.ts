import mongoose, { Document, Schema } from 'mongoose'

export interface IRegion extends Document { 
  name?:string
  latitude?:number
  longitude?:number    
  latitudeDelta?:number
  longitudeDelta?:number
  creator?:string
}


const RegionSchema = new Schema({
  name: {type: String, required: true},
  latitude: {type: Number, required:true},
  longitude: {type: Number, required:true},
  latitudeDelta: {type: Number, required:true},
  longitudeDelta: {type: Number, required:true},
  creator:{type: Schema.Types.ObjectId, ref: 'User' , required: true}
})
export default mongoose.model<IRegion>('Region', RegionSchema)



