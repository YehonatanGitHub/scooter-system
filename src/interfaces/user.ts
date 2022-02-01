import { Document } from 'mongoose';

export default interface IUser extends Document {
  username: String;
  password: String;
  first_name: String;
  last_name: String;
  email: String;
}

