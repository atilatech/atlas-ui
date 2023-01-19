export interface User {
    email: string,
    username: string,
}

export interface UserProfile {
    id: string,
    user: User,
    is_premium: boolean,
    atlas_searches: boolean,
}