import { EntitySchema } from "typeorm";

// Since we are NOT using Typescript, Typeorms syntax with decorators won't work
export const Note = new EntitySchema({
  name: "Note",
  tableName: "notes",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    body: {
      type: "text",
    },
  },
});
