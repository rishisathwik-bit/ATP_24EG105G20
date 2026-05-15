import exp from 'express';
import { empApp } from './APIs/EmployeeAPI.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = exp();

app.use(cors());
app.use(exp.json());

app.use('/emp-api', empApp);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const PORT = process.env.PORT || 5000;

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
