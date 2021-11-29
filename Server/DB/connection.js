import mongoose from 'mongoose';

const uri =
  'mongodb+srv://mongoadmin:admin1234@melodycluster.cgcsn.mongodb.net/MelodyDB';

const connectDB = async () => {
  await mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
      console.log('Connected to DB');
    })
    .catch((err) => {
      console.log(err);
    });
};
export default connectDB;
