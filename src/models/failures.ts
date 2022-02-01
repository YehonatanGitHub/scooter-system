import mongoose, { Schema } from 'mongoose';
import IFailures from '../interfaces/failures';

const FailuresSchema: Schema = new Schema({
  type: { type: String, enum: ['routine_care', 'brake_replacement', 'wheel_replacement'], required: true },
  status: { type: String, enum: ['open', 'care', 'closed'], required: true },
  open_time: { type: Date, required: true },
  close_time: { type: Date, required: true }
});

export default mongoose.model<IFailures>('Failures', FailuresSchema);

