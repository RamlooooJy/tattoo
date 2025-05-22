import winston from 'winston'

const consoleFormat = winston.format.combine(
  winston.format.colorize(), // 🎨 цвет
  winston.format.timestamp(), // 🕒 время
  winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`
  }),
)

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.json(),
    }),
    new winston.transports.File({
      filename: 'combined.log',
      format: winston.format.json(),
    }),
  ],
})
