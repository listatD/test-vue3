export {}

declare module 'vue-router' {
  interface RouteMeta {
    public?: boolean
    layout?: string
  }
}
