import { string, z } from "zod"

// type loginInfo = {
//     userName: string
//     email: string
//     password: string
// }

const loginInfo = z.object({
    id: z.string(),
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
})

export let users:  z.infer<typeof loginInfo>[] = [
    {   
        id: "1",
        username: "test",
        email: "test@test.com",
        password: "12345678"
    }
];

export const getUsers = () => users;


export const createUser = (user: z.infer<typeof loginInfo>) => {
    users.push(user)
};