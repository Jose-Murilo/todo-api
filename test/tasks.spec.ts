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
    execSync("npm run knex migrate:rollback --all")
    execSync("npm run knex migrate:latest")
  })

  it('should be albe to a ', () => {
    
  })
})