import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

const movies = [];

router.post("/", (req, res) => {
    const { title, year, director, rate } = req.body;
    if (!title || !year || !director || !rate) {
        return res.status(400).json({ error: "Required fields: title, year, director, note" });
    }

    const newMovie = {
        id: uuidv4(),
        title,
        year,
        director,
        rate,
        comments: []
    };

    movies.push(newMovie);
    res.status(201).json(newMovie);
});

router.post("/:id/comments", (req, res) => {
    const movie = movies.find(movie => movie.id === req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    const { author, message } = req.body;
    if (!author || !message) {
        return res.status(400).json({})
    }

    const comment = {
        id: uuidv4(),
        author,
        message,
        data: new Date(),
    };

    movie.comments.push(comment);
    res.status(201).json(comment);
});

router.get("/:id/comments", (req, res) => {
    const movie = movies.find(movie => movie.id === req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    res.json(movie.comments);
});

export default router;