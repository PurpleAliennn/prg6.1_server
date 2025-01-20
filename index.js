import express from 'express';
import mongoose from 'mongoose';
import notes from "./routes/books.js";

mongoose.connect('mongodb://127.0.0.1:27017/prg6');

const app = express();

app.use((req, res, next) => {
    const acceptHeader = req.headers.accept;
    console.log(`Client accepts: ${acceptHeader}`);

    if (acceptHeader.includes('application/json')) {
        next();
    } else {
        return res.status(406).send('Illegal format');
    }
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization')
    next();
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/books', notes)


app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});