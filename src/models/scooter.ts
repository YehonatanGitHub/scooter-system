import mongoose, { Schema } from 'mongoose';
import IScooter from '../interfaces/scooter';

const ScooterSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  location: { type: Object, required: true },
  model: { type: String, required: true },
  year_manufacture: { type: Number, required: true },
  status: { type: String, enum: ['active', 'broken', 'handled', 'charged'], required: true }
});

export default mongoose.model<IScooter>('Scooter', ScooterSchema);

