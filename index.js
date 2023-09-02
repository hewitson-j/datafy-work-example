import "reflect-metadata";
import express from "express";
import AppDataSource from "./AppDataSource.js";
import noteRoutes from "./routes/note.controller.js";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const app = express();
app.use("/api", noteRoutes);

const port = 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
