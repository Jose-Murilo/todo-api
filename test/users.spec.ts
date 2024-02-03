import { describe, it, beforeAll, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import { execSync } from 'child_process'
import { app } from '../src/app'

describe('Users routes', () => {
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

  it('should be albe to create a new user', async () => {
    await request(app.server)
      .post('/users')
      .send({
        user: 'Murilo',
        email: 'murilotest@gmail.com'
      })
      .expect(201)
  })
})