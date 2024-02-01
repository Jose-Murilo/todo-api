import { FastifyInstance } from "fastify";

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/', () => {
    return "hello world"
  })
}