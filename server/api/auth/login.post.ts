import bcrypt from "bcryptjs";
import { getPool } from "#imports";
import { signToken } from "#imports";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const email = String(body?.email ?? '').trim().toLocaleLowerCase()
    const password = body?.password


    console.log(email)
    if(!email || email.length > 255 || typeof password !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid user'
        })
    }

    const pool = getPool(event)

    const [rows] = await pool.execute(
        'SELECT user_id, email, password_hash, role FROM users WHERE email = ? LIMIT 1',[email]
    )

    const users = rows as {
        id: number
        email: string
        password_hash: string
        role: 'user' | 'admin'
    }[]

    const user = users[0]

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        throw createError({
            status: 401,
            statusMessage: 'Email or password is incorrect',
        })
    }
    const token = signToken(event, {
        id: user.id,
        email: user.email,
        role: user.role,
    })

    return{
        success: true,
        token,
        user:{
            id: user.id,
            email: user.email,
            role: user.role,
        }
    }
})