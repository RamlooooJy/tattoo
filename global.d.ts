declare global {
  interface Window {
    __APP_VERSION__?: string
    // or APP_VERSION: string, if that's the name you're using
  }
}

export {}
