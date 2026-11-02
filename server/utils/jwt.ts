import jwt  from "jsonwebtoken";
import type { H3Event } from "#imports";

export interface AuthUser {
    id: number
    email: string
    role: 'user' | 'admin'
}

export function signToken(event: H3Event, user: AuthUser){
    const config = useRuntimeConfig(event)

    if(!config.jwtSecret){
        throw new Error('NUXT_JWT_SECRET is not configured')
    }

    return jwt.sign(
        { email: user.email, role:user.role },
        config.jwtSecret,
        {
            subject: String(user.id),
            expiresIn: '1h',
        },
    )
}

export function verifyToken(event: H3Event): AuthUser {
    const config = useRuntimeConfig(event)
  const header = getHeader(event, 'authorization')
  const token = header?.match(/^Bearer\s+(.+)$/i)?.[1]

  if(!token || !config.jwtSecret){
    throw createError({
        statusCode:401,
        statusMessage: 'Unauthorized',
    })
  }

  try{
    const payload = jwt.verify(token, config.jwtSecret)

    if(typeof payload === 'string' || !payload.sub || typeof payload.sub !== 'string' || !payload.email || (payload.role !== 'user' && payload.role !== 'admin')
    ){
    throw new Error("invalid token payload")
}
    return {
        id: Number(payload.sub),
        email:payload.email,
        role: payload.role,
    }
  }
  
  catch {
    throw createError({
        statusCode: 401,
        statusMessage: "invalid or expired token",
    })
}

} 

