import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';
// import bcrypt from 'bcrypt';

// UserSchema.pre('save', function (next) {
//   // https://www.youtube.com/watch?v=m_8rwKsYmnY
// })
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<IUser>('User', UserSchema);

