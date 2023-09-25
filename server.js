const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://irysik123:sOEZOuVSm1zEZrMQ@cluster0.xhrrcxy.mongodb.net/db-books?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
