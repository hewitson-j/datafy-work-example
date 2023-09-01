import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { Note } from "./entity/Note.js";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "PerLim1618!",
  database: "datafy_api",
  entities: [Note],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const app = express();

const port = 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
