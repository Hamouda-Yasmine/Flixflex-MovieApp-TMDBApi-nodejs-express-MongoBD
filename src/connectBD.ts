import mongoose from "mongoose";

const connectDB = async () => {
    try {
      const uri = 'mongodb+srv://yasmongobd:ohJWdDp5UgFdeEp6@flixflex.qzkh1bt.mongodb.net/?retryWrites=true&w=majority';
     
      await mongoose.connect(uri, {
        useNewUrlParser: true, // no longer needed, but won't cause an error
        useUnifiedTopology: true, // no longer needed, but won't cause an error
      });
      console.log('Connected to MongoDB ');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  export default connectDB;