import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import "dotenv/config";
import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memory";

const app = fastify();

app.register(authRoutes);
app.register(memoriesRoutes);

app.register(fastifyJwt, {
  secret: 'spacetime'
})

app.register(fastifyCors, {
  origin: true,
});

app
  .listen({
    port: 3333,
    host: '0.0.0.0'
  })
  .then(() => {
    console.log("Servido Online🚀");
  });
