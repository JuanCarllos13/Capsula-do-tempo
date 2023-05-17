import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { memoriesRoutes } from "./routes/memory";

const app = fastify();

app.register(memoriesRoutes);

app.register(fastifyCors, {
  origin: true
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Servido Online🚀");
  });
