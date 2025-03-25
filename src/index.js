import express from "express";
import movieRouter from "./routes/movies.js";

const app = express();
app.use(express.json());

app.use("/movies", movieRouter);

const SERVER_PORT = 3000;
app.listen(SERVER_PORT, () => {
    console.log(`MovieBox rodando na porta ${SERVER_PORT}`);
});