import { H3Event, eventHandler } from "#imports";
import { AuthUser } from "./jwt";
import { verifyToken } from "./jwt";

type AuthHandler = (
    event: H3Event,
    user: AuthUser,
) => ReturnType<EventHandler>

export function WithAuth(handler: AuthHandler){
    return defineEventHandler(async (event) => {
        const user = verifyToken(event)

        return await handler(event, user)
    })
}