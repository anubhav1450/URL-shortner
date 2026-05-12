require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");
const urlRouter = require("./src/routes/route.url");

const port = process.env.PORT || 3000;

connectDB();

app.use("/", urlRouter);

app.listen(port, () => {
  console.log("Server is Live");
});