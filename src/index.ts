import { PrismaClient } from "@prisma/client";
import app from "./app";


const prisma = new PrismaClient();


const port = process.env.port || 8008;

async function main() {
  app.listen(port , ()=> {
    console.log(`Server Running on ${port}`);
  });
}

main();
