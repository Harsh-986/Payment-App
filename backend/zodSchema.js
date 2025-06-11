const {z} = require("zod")

const signupZodSchema = z.object({
    username : z.string(),
    password : z.string(),
    firstName: z.string(),
    lastName : z.string()
})

const signinZodSchema = z.object({
    username: z.string(),
    password: z.string()
})

const updateBody = z.object({
	password : z.string().optional(),
    firstName: z.string().optional(),
    lastName : z.string().optional(),
})


module.exports = {
    signupZodSchema,
    signinZodSchema,
    updateBody
}