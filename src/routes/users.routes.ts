import { FastifyInstance } from "fastify";
import { randomUUID } from 'node:crypto' 
import { knex } from "../database";
import { z } from "zod";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserSchema = z.object({
      user: z.string(),
      email: z.string()
    })

    const { user, email } = createUserSchema.parse(request.body)

    const isEmailExists = await knex('users').where('email', email).select().first()

    if (isEmailExists) {
      return reply.status(400).send({
        message: "E-mail already exists"
      })
    }

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
    }

    await knex('users').insert({
      id: randomUUID(),
      user,
      email,
      created_at: new Date(),
      updated_at: new Date(),
      session_id: sessionId
    })

    return reply.status(201).send()
  })
}