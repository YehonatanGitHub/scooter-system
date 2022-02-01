import { Document } from 'mongoose';

export default interface IParking extends Document {
  address: String;
  number_parking: Number;
  location: { lat: Number, lng: Number };
}

