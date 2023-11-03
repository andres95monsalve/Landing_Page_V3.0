import express from "express";

export default function start() {
  const app = express();
  app.get("/", (req, res) => {
    // ...
  });
  app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
  });
}
