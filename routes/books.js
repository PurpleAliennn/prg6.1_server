import Book from "../schemas/BookSchema.js";
import express from "express"

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const books = await Book.find({});
        console.log(books);

        let collection = {
            items: books,
            _links: {
                self: {
                    href: process.env.BASE_URL + `/books/`
                },
                collection: {
                    href: process.env.BASE_URL + `/books/`
                }
            }
        }
        res.json(collection);

    } catch (error) {
        res.json({error: error.message})
    }
})

router.post('/', async (req, res) => {

    try {
        const {title, author, description, genre, pages} = req.body;

        const book = await Book.create({
            title: title,
            author: author,
            description: description,
            genre: genre,
            pages: pages
        })

        res.status(201).json(book);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST'])
    res.send();
});