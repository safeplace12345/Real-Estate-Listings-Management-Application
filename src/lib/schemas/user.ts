import { Schema, model } from "mongoose";

export interface IFav  {
  brokerTitle: string;
  type: string;
  address: string;
}

export interface IUser  {
  uid: string;
  name: string;
  email: string;
  token: string;
  favorites?: IFav[];
  save: () => void;
}

const usersSchema = new Schema<IUser>({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  token: { type: String },
  favorites: [{ brokerTitle: String,  type: {type: String}, address: String}]
});

export const usersModel = model("Users", usersSchema);
