

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  favorites: string[]; // Array of movie IDs
}

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: String }], // Array of movie IDs
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;