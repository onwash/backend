import mongoose , {Schema, Document} from 'mongoose'

export interface IСoordinates extends Document { 
  longitude: number
  latitude: number
}

const СoordinatesSchema = new Schema(
  {
    longitude: { type: Number, required: true  },
    latitude: { type: Number, required: true  },
  },
  {
    timestamps: true,
  }
);

const СoordinatesModel = mongoose.model<IСoordinates>("Сoordinates", СoordinatesSchema);

export default СoordinatesModel;


//59.9832212 30.3870249
//Лабораторный пр., 20, Санкт-Петербург, 195197