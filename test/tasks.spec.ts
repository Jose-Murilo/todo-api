import { describe, it, beforeAll, beforeEach, afterAll } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

// app.get('/', { preHandler: [checkSessionIdExists] }, async (request, reply) => {
//   const listAllTasks = await knex('tasks').select()

//   return { tasks: listAllTasks }
// })

describe('Tasks routes', async () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })


  it('should be albe to a list all tasks ', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        user: 'Murilo',
        email: 'murilotest@gmail.com'
      })
      .expect(201)

      const userId = user.get('Set-Cookie')[0]

      const createTask = await request(app.server)
      .post('/tasks')
      .send({
        title: 'Murilo',
        description: 'murilotest@gmail.com'
      })
      .expect(201)
      
      console.log(createTask)
  })
})