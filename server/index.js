require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authUser = require("./routes/auth");
const postUser = require("./routes/post");
const cors = require("cors");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learning.aqkok.mongodb.net/mern-learning?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Connected Failed", error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authUser);

app.use("/api/posts", postUser);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
