import { $Enums, type User } from 'prisma/index'
import Roles = $Enums.Roles

export type GetReservationParams = {
  date: Date
}

export type UserData = {
  role: Roles
  userId: User['id']
}
/*
 * 1) блокировка даты если все занято – нужно возвращать занятые даты в месяце (запрос каждую смену месяца)
 * 2) блокировка времени если занято - аккумулировать, но для админа лучше знать кем
 * 3) set reservatipn
 * */
