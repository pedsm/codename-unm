import { Connection, createConnection } from "typeorm";

let connection = null

export async function getConnection():Promise<Connection> {
  if (connection == null) {
    connection = await createConnection()
    return connection
  }
  return connection
}