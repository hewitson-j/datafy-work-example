import { Note } from "./entity/note.entity.js";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "PerLim1618!",
  database: "datafy_api",
  entities: [Note],
  synchronize: true,
});

export default AppDataSource;
