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
    }
  },
  { timestamps: true }
);

const LoginCollection = mongoose.model('LoginCollection', loginSchema);

export default LoginCollection;
