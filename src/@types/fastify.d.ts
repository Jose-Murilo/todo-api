import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user?: {
      id: string
      session_id: string
      user: string
      email: string
      created_at: Date
      updated_at: Date
    }
  }
}