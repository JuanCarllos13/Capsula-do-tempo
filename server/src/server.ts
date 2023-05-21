import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import "dotenv/config";
import fastify from "fastify";
import { resolve } from "node:path";
import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memory";
import { uploadRoutes } from "./routes/upload";

const app = fastify();

app.register(multipart);

app.register(fastifyStatic, {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});

app.register(authRoutes);
app.register(memoriesRoutes);
app.register(uploadRoutes);

app.register(fastifyJwt, {
  secret: "spacetime",
});

app.register(fastifyCors, {
  origin: true,
});

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Servido Online🚀");
  });
