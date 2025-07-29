import type { CreateReservationParams } from 'app/api/reservation/reservation.types'
import { db } from '../../../backend/db/init'
import { logger } from 'backend/logger'
import type { Reservation } from 'prisma/index'

class ReservationService {
  async createReservation({
    userId,
    from,
    to,
    message,
  }: CreateReservationParams) {
    try {
      if (!userId || !from || !to) {
        logger.warn('userId, from и to обязательны')
        throw new Error('userId, from и to обязательны')
      }

      const fromDate = new Date(from).toISOString()
      const toDate = new Date(to).toISOString()

      const reservation = await db.reservation.create({
        data: {
          userId,
          from: fromDate,
          to: toDate,
          message,
        },
      })

      logger.info(`Бронирование успешно создано: ${reservation.id}`)
      return reservation
    } catch (err) {
      logger.error(`Ошибка при создании бронирования: ${err}`)
      throw err
    }
  }
  async deleteReservation(id: Reservation['id']) {
    try {
      const existing = await db.reservation.findUnique({ where: { id } })

      if (!existing) {
        logger.warn(`Бронирование с id ${id} не найдено`)
        throw new Error('Бронирование не найдено')
      }

      await db.reservation.delete({ where: { id } })

      logger.info(`Бронирование ${id} удалено`)
      return true
    } catch (err) {
      logger.error(`Ошибка при удалении бронирования: ${err}`)
      throw err
    }
  }
  async deleteManyReservation(date: Date) {
    try {
      const data = await db.reservation.deleteMany({
        where: { from: { lt: date } },
      })

      logger.info(`Бронирований ${data.count} удалено`)
      return true
    } catch (err) {
      logger.error(`Ошибка при удалении бронирований: ${err}`)
      throw err
    }
  }
  async getReservations() {
    try {
      const reservations = await db.reservation.findMany({
        orderBy: { from: 'asc' },
      })
      logger.info(`Найдено ${reservations.length} бронирований`)
      return reservations
    } catch (err) {
      logger.error(`Ошибка при получении бронирований: ${err}`)
      throw err
    }
  }
  async getReservationsByDate(date: Date) {
    try {
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)

      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)

      const where = {
        from: {
          gte: startOfDay,
          lte: endOfDay,
        },
      }

      const reservations = await db.reservation.findMany({
        where,
        orderBy: { from: 'asc' },
      })

      logger.info(`Найдено ${reservations.length} бронирований`)
      return reservations
    } catch (err) {
      logger.error(`Ошибка при получении бронирований: ${err}`)
      throw err
    }
  }
}

export const reservationService = new ReservationService()
