import dotenv from "dotenv";
import path from "path";

const root = path.join.bind(this, __dirname, "../../");
export const rootPath = path.resolve();

dotenv.config({ path: root(".env") });

export const isProduction = process.env.NODE_ENV === "production";
//@ts-ignore
export const isDevelopment = process.env.NODE_ENV !== isProduction;

export const url = process.env.URL;
export const port = process.env.PORT;
export const endpointURL = process.env.ENDPOINTURL;
export const dbuser = process.env.MDBUSER;
export const dbpas = process.env.MDBPAS;
export const dbase = process.env.MDBASE;
export const secretoken = process.env.OA;

console.log(`Production?: ${isProduction}`);
