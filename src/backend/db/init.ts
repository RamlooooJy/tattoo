import { PrismaClient } from 'prisma/client'

class PrismaSingleton {
  private static instance: PrismaClient

  private constructor() {} // запрет создания экземпляров

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient()

      if (process.env.NODE_ENV !== 'production') {
        // @ts-ignore
        global.prisma = PrismaSingleton.instance
      }
    }

    // В dev, если клиент уже сохранён в глобале — используем его
    // @ts-ignore
    if (process.env.NODE_ENV !== 'production' && global.prisma) {
      // @ts-ignore
      return global.prisma
    }

    return PrismaSingleton.instance
  }
}

export const db = PrismaSingleton.getInstance()
