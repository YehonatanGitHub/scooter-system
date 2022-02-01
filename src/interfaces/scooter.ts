import { Document } from 'mongoose';

export default interface IScooter extends Document {
  id: String;
  location: { lat: Number, lng: Number };
  model: String;
  year_manufacture: Number;
  status: String;
}

