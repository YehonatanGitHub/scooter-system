import { Document } from 'mongoose';

export default interface IScooter extends Document {
  id: string;
  location: { lat: number, lng: number };
  model: string;
  year_manufacture: number;
  status: string;
}

