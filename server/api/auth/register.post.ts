import { create } from "axios";
import bcrypt from "bcryptjs";
import { getPool } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const email = String(body?.email ?? '').trim().toLowerCase()
    const password = body?.password

    const passwordHash = await bcrypt.hash(password, 12)
    const pool = getPool(event)

    try {
        const [result] = await pool.execute(
            'INSERT INTO users (email, password_hash) VALUE  (?,?)',
            [email, passwordHash]
        )

        return {
            success: true,
            message: 'Registerd successfully'
        }
    }catch(error: any){
        if(error.code == "ER_DUP_ENTRY") {
            throw createError({
                statusCode: 409,
                statusMessage: 'Email already exists'
            })
        }
    }
})