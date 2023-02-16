import mongoose from 'mongoose';

export const db = () => {
  try {
    console.log('Connecting to Database...');
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });

    mongoose.connection.on('error', (err) => {
      console.log('err', err);
    });

    mongoose.connection.on('connected', (err, res) => {
      console.log('DB Connected Successfully');
    });
  } catch (error) {
    console.log(error.message);
  }
};
