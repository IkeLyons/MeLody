import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const loginSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const logincollection = mongoose.model('logincollection', loginSchema);

export default logincollection;
