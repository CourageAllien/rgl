// @ts-nocheck
// Prisma client will be generated after running: npx prisma generate

let prisma: any

try {
  const { PrismaClient } = require('@prisma/client')
  
  const globalForPrisma = globalThis as unknown as {
    prisma: typeof PrismaClient | undefined
  }

  prisma = globalForPrisma.prisma ?? new PrismaClient()

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} catch {
  // Prisma client not generated yet
  // Run: npx prisma generate
  console.warn('Prisma client not generated. Run: npx prisma generate')
  prisma = null
}

export { prisma }
export default prisma
