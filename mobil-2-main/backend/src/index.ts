import express from 'express'
import cors from 'cors'
import { upload } from './multer'
import { execute } from './inference'

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


app.post('/inference', upload.single('pdf'), async (req, res) => {
    res.setHeader("Contet-Type", "applicaton/json")
    if (!req.file) {
        res.status(400).send({ message: 'No se ha proporcionado ningún archivo PDF.' });
    }
    if (!req.body.question) {
        res.status(400).send({ message: 'No se ha proporcionado ninguna pregunta.' });
    }
    const text = await execute({
        path: `uploads/${req.file?.filename}`,
        question: req.body.question
    })
    res.status(200).send({ text });
})
  
