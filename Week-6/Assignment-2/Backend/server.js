import exp from 'express';
import { empApp } from './APIs/EmployeeAPI.js';
import mongoose from 'mongoose';
import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

const app = exp();

app.use(cors());
app.use(exp.json());

app.use('/emp-api', empApp);

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://rishi_sathwik:rishi2626@cluster0.o4pulwx.mongodb.net/BLOG-APP?retryWrites=true&w=majority");

    const PORT = 4000;

    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });

  } catch (err) {
    console.log("error occured while connecting to dbase", err);
  }
}

connectDB();

app.use((err, req, res, next) => {
  console.log("err in middleware:", err.message);

  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });
});
