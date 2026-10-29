import { H3Event } from "#imports";
import { AuthUser } from "./jwt";
import { WithAuth } from "./with-auth";

type AdminHandler = (
    event: H3Event,
    user: AuthUser,
) => unknown | Promise<unknown>

export function withAdmin(handler: AdminHandler) {
    return WithAuth(async(event,user) =>{
        if(user.role !== 'admin') {
            throw createError({
                statusCode: 403,
                statusMessage: 'Forbidden',
            })
        }

    
        return await handler(event, user)
    })
}