import { Knex } from "knex"

declare module 'knex/types/tables' {
  interface Tables {
    tasks: {
      id: string
      user_id: string
      title: string
      description: string
      completed_at: string | null
      created_at: Date
      updated_at: Date
    }

    users: {
      id: string
      user: string
      email: string
      session_id: string
      created_at: Date
      updated_at: Date
    }
  }
}