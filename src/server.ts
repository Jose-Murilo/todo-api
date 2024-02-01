import { app } from "./app";

app.listen({
  port: 3333
}).then(() => {
  console.log("HTTP Server running")
}).catch((error) => {
  console.log("Error in server: ", error);
})