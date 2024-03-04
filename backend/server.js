require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

// DB Config from environment variable
const db = process.env.MONGODB_ATLAS_CONNECTION;

// Connect to MongoDB using async/await
async function connectToMongoDB() {
  try {
    await mongoose.connect(db);
    console.log("MongoDB successfully connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectToMongoDB();

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));
