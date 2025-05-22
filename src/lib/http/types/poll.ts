export type PollParams = {
  fn: <T>() => Promise<T>
  validate?: <T>(result: T) => boolean
  interval?: number
  maxAttempts?: number
}
