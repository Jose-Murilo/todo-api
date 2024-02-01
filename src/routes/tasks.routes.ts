import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from 'node:crypto' 
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const listAllTasks = await knex('tasks').select()

    return { tasks: listAllTasks }
  })

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const getTaskParamsSchema = z.object({
      id: z.string().uuid()
    }) 

    const { id } = getTaskParamsSchema.parse(request.params)

    const getTaskById = await knex('tasks').where({
      id,
      user_id: request.user?.id
    }).first()

    if (!getTaskById) {
      return reply.status(400).send({
        message: "Task not found."
      })
    }

    return { task: getTaskById }
  })

  app.put('/:id', { preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const updateTaskParamsSchema = z.object({
      id: z.string().uuid()
    }) 

    const { id } = updateTaskParamsSchema.parse(request.params)

    const updateTaskBodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    })

    const { title, description } = updateTaskBodySchema.parse(request.body)

    const getTaskById = await knex('tasks').where({
      id,
      user_id: request.user?.id
    }).first()

    const updateTask = await knex('tasks').where({
      id,
      user_id: request.user?.id
    }).update({
      title: title ?? getTaskById?.title,
      description: description ?? getTaskById?.description,
    })

    if (!updateTask) {
      return reply.status(400).send({
        message: "Task not found."
      })
    }

    return reply.status(204).send()
  })

  app.delete('/:id', { preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const deleteTaskParamsSchema = z.object({
      id: z.string().uuid()
    }) 

    const { id } = deleteTaskParamsSchema.parse(request.params)

    const deleteTask = await knex('tasks').where({
      id,
      user_id: request.user?.id
    }).delete()

    if (!deleteTask) {
      return reply.status(400).send({
        message: "Task not found."
      })
    }

    return reply.status(204).send()
  })

  app.post('/', { preHandler: [checkSessionIdExists] }, async (request, reply) => {
    console.log("aa")

    const createTaskBodySchema = z.object({
      title: z.string(),
      description: z.string(),
    })

    const { title, description } = createTaskBodySchema.parse(request.body)

    await knex('tasks').insert({
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      user_id: request.user?.id,
      created_at: new Date(),
      updated_at: new Date()
    })

    return reply.status(201).send()
  })
}