import {model, Schema, Document} from 'mongoose';
import { IUser } from '../interface/user.interface';
import moment from 'moment';
const userSchema: Schema = new Schema<IUser>({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    number: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasCard: {
      type: Boolean,
      required: true,
      default: false,
    },
    joined: {
      type: Date,
      default: () => moment().toDate(),
    },

});

const userModel = model<Document>('users', userSchema);
export default userModel;