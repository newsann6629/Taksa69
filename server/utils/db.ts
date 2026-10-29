import mysql from 'mysql2/promise'
import { H3Event } from '#imports'

let pool: mysql.Pool | undefined

export function getPool(event: H3Event){
    if(!pool){
        const config = useRuntimeConfig(event)

        pool = mysql.createPool({
            host: config.dbHost,
            port: Number(config.dbPort),
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName,
            connectionLimit: 10,
        })
    }
    return pool
}



export { pool }