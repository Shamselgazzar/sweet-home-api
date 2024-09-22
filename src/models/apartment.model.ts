import mongoose, { Schema, Document } from 'mongoose';

interface Apartment extends Document {
  _id: string;
  name: string;
  unitNumber: string;
  project: string;
  price: number;
  location: string;
  description: string;
  moreDetails: string;
  images: string[];
  rooms: number;
  bathrooms: number;
  size: number;
  yearBuilt: number;
  available: boolean;
}

const ApartmentSchema: Schema = new Schema({
  name: { type: String, required: true },
  unitNumber: { type: String, required: true },
  project: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: false },
  moreDetails: { type: String, required: false },
  images: [{ type: String, required: false }],
  rooms: { type: Number, required: false },
  bathrooms: { type: Number, required: false },
  size: { type: Number, required: true },
  yearBuilt: { type: Number, required: false },
  available: { type: Boolean, default: true }
});

export const Apartment = mongoose.model<Apartment>('Apartment', ApartmentSchema);
