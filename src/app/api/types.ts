export enum ResultTypes {
  Ok = 200,
  Created = 201,
  Empty = 204,
}

export enum ErrorTypes {
  Conflict = 409,
  NotFound = 404,
  Forbidden = 403,
  InternalError = 500,
}

export type Response = {
  status: ErrorTypes | ResultTypes
  message: string
}

// export type ResponseStatusData<T> = Response & T

export type ResponseWithData<T> = Response & T

export const AllowAllHeaders = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

export const ExistError = {
  status: ErrorTypes.Conflict as const,
  message: 'Уже существует',
}

export const NotFoundError = {
  status: ErrorTypes.NotFound as const,
  message: 'Не найдено',
}

export const ForbiddenError = {
  status: ErrorTypes.Forbidden as const,
  message: 'Нет доступа',
}

export const InternalError = {
  status: ErrorTypes.InternalError as const,
  message: 'Ошибка на сервере',
}

export const Ok = {
  status: ResultTypes.Ok as const,
  message: 'Успешно',
}

export const Created = {
  status: ResultTypes.Created as const,
  message: 'Успешно создан',
}
export const Empty = {
  status: ResultTypes.Empty as const,
  message: 'Нет данных',
}

export const responses = {
  ExistError,
  NotFoundError,
  ForbiddenError,
  InternalError,
  Ok,
  Created,
  Empty,
}
