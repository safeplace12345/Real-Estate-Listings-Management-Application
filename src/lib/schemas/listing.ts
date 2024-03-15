import { Schema, model } from "mongoose";

export interface IListing {
  brokerTitle: string,
  type: string,
  price: number,
  beds: number,
  bath: number,
  propertySqft: number,
  address: string,
  state: string,
  mainAddress: string,
  administrativeAreaLevel2: string,
  locality: string,
  subLocality: string,
  streetName: string,
  longName: string,
  formattedAddress: string,
  latitude: number,
  longitude: number,
}

const listingSchema = new Schema<IListing>({
  brokerTitle: { type: String },
  type: { type: String },
  price: { type: Number },
  beds: { type: Number },
  bath: { type: Number },
  propertySqft: { type: Number },
  address: { type: String },
  state: { type: String },
  mainAddress: { type: String },
  administrativeAreaLevel2: { type: String },
  locality: { type: String },
  subLocality: { type: String },
  streetName: { type: String },
  longName: { type: String },
  formattedAddress: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
});

export const listingsModel = model("Listings", listingSchema);
