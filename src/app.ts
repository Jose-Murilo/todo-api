import fastify from "fastify";
import { tasksRoutes } from "./routes/tasks.routes";
import { usersRoutes } from "./routes/users.routes";
import cookie from "@fastify/cookie";

export const app = fastify()

app.register(cookie)

app.register(usersRoutes, {
  prefix: "/users"
})

app.register(tasksRoutes, {
  prefix: "/tasks"
})