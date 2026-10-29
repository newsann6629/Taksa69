import { getPool } from '../utils/db'

export default defineEventHandler(async(event) => {
    const pool = getPool(event)

    const [rows] = await pool?.query(
        'SELECT DATABASE() AS db, 1 AS connected'
    )

    return{
        success: true,
        database: (rows as any[])[0].db,
        connected: (rows as any[])[0].connected,
    }
})