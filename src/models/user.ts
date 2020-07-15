import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface IUser extends mongoose.Document { 
  email: string
  login: string
  password: string
  phonenumber: {
    type: any;
  }
  comments: {
    type: any;
  }
  role: "user" | "admi" | "sudo" 
  region: any
  settings:{
    mapSettings:any
  }
}
const userSchema = new Schema ({
  email:{
    type: String,
    required:true,
  },
  login:{
    type: String,
    required:true,
  },
  password :{
    type: String,
    required:true,
  },
  phonenumber: {
    type: Number,
  },
  comments:{
    type: Schema.Types.ObjectId,
    ref:'Comment'
  },
  role:{
    type: String,
    default: "user",
    enum: ["user",  "admi", "sudo"]
  },
  region:{
    type: Schema.Types.ObjectId,
    ref: 'Region',
    required: true
  },
  settings:{
    mapSettings:{
      type: Schema.Types.ObjectId,
      ref: 'MapSettings',
      required: true
    }
  }
  
}, {timestamps:{createdAt:'created_at'}})
export default mongoose.model<IUser>('User', userSchema)



