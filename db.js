const mongoose = require("mongoose");
// require("dotenv").config();

mongoose
  .connect("mongodb://localhost/users", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull"))
  .catch((error) => console.log(`Database connection error ${error}`));
