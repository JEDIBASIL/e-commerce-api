import { model, Schema, Document } from 'mongoose';
import moment from 'moment';
import { IUser } from '../interface';
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
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  joinedAt: {
    type: Date,
    default: () => moment().toDate(),
  },

});

const userModel = model<Document>('users', userSchema);
export default userModel;