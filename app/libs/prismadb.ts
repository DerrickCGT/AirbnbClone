import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

// If `prisma` exists on the global object, use it; otherwise, create a new instance of PrismaClient.
// This helps in reusing the PrismaClient instance if it's already available.
const client = globalThis.prisma || new PrismaClient()

// If the app is not in 'production' mode, attach the PrismaClient instance to the global object.
// This ensures that during development, the same PrismaClient instance is reused across hot reloads, 
// which can improve performance.
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client;
