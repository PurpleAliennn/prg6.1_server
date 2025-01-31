import Book from "../schemas/BookSchema.js";
import express from "express"

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const books = await Book.find({});
        // console.log(books);

        let collection = ({
            items: books,
            _links: {
                self: {
                    href: process.env.BASE_URL + `/books/`
                },
                collection: {
                    href: process.env.BASE_URL + `/books/`
                }
            }
        })
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
    res.status(200).send();
});

router.get('/:id', async (req, res) => {

    const bookId = req.params.id;

    try {
        const books = await Book.findById({_id:bookId})
        // console.log(books === null);
        if(books === null){
            res.status(404).json({error: "Book does not exist"})
            return;
        }
        res.json(books);
    } catch (error) {
        res.json({error: error.message});
    }
})

router.put('/:id', async (req, res) => {
    const bookId = req.params.id;

    console.log("hello")
    console.log("id:", bookId);

    const newBook = req.body;

    if(newBook.title === "" || typeof(newBook.title) === "undefined"){
        return res.status(415).json({error: "Incorrect format or empty values"})
    }
    if(newBook.author === "" || typeof(newBook.author) === "undefined"){
        return res.status(415).json({error: "Incorrect format or empty values"})
    }
    if(newBook.description === "" || typeof(newBook.description) === "undefined"){
        return res.status(415).json({error: "Incorrect format or empty values"})
    }
    if(newBook.genre === "" || typeof(newBook.genre) === "undefined"){
        return res.status(415).json({error: "Incorrect format or empty values"})
    }
    if(newBook.pages === "" || typeof(newBook.pages) === "undefined"){
        return res.status(415).json({error: "Incorrect format or empty values"})
    }


    try{
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            newBook,
            {
                runValidators: true,
                new: true
            }
        )
        res.status(200).json(updatedBook)

    } catch (error) {
        res.status(400).json({error: error.message});
    }

})

router.delete('/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        await Book.findByIdAndDelete(bookId);

        res.status(204).json()
    } catch (error) {
        res.json({error: error.message});
    }
})

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'PUT', 'DELETE'])
    res.send();
});

export default router