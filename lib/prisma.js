import { PrismaClient } from "@/lib/generated/prisma";

export const db = globalThis.prisma ||  new PrismaClient();

if(process.env.NODE_ENV !== "production"){
    globalThis.prisma = db;
}


//globalThis is used to prevent multiple instances of Prisma Client in development. This ensures that the same instance is reused across hot reloads, avoiding potential connection issues with the database. In production, a new instance is created as usual.Without this , each time your application reloads (which happens often in development), a new instance of Prisma Client would be created, potentially leading to too many connections to your database.