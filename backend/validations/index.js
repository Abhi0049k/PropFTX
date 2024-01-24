const zod = require('zod');

const userValidation = zod.object({
    email: zod.string().email(),
    password: zod.string().min(1)
})

const movieValidation = zod.object({
    title: zod.string(),
    genre: zod.string(),
    releaseDate: zod.coerce.date(),
    director: zod.string()
})

module.exports = { userValidation, movieValidation }