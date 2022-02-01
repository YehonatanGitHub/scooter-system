import { Document } from 'mongoose';

export default interface IFailures extends Document {
  type: String;
  status: String;
  open_time: Date;
  close_time: Date;
}

