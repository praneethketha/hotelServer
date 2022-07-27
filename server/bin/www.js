const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./../app");
dotenv.config({ path: "./.env" });

// mongoose connection
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB);
// .then(() => console.log(err))

// .catch((err) => console.log(err));

// starting the server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is listening port 8000");
});
