const {z} = require("zod")

const signupZodSchema = z.object({
    username : z.string(),
    password : z.string(),
    firstName: z.string(),
    lastName: z.string()
})

const signinZodSchema = z.object({
    username: z.string(),
    password:z.string()
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})


module.exports = {
    signupZodSchema,
    signinZodSchema,
    updateBody
}