import { model, Schema, Document, CallbackWithoutResultAndOptionalError } from 'mongoose';
import moment from 'moment';
import { IUser } from '../interface';
import bcrypt from "bcrypt"

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
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  joinedAt: {
    type: Date,
    default: () => moment().toDate(),
  },

});

userSchema.pre('save', async function(next:CallbackWithoutResultAndOptionalError) {
  if(!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
})



const userModel = model<Document & IUser>('User', userSchema);
export default userModel;