import {User} from './User'
export type UserAuth = {
    user: User,
    access_token: string,
    token_type: string,
    expires_at: string
}