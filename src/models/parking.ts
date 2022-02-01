import mongoose, { Schema } from 'mongoose';
import IParking from '../interfaces/parking';

const ParkingSchema: Schema = new Schema({
  address: { type: String, required: true, unique: true },
  number_parking: { type: Number, required: true },
  location: { type: Object, required: true },
});

export default mongoose.model<IParking>('Parking', ParkingSchema);

