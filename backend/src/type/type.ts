export interface email {
    email: string,
    id: string
}
export interface user {
    userid: string,
    username: string,
    email: string,
    password: string
}
export interface verification {
    userid: string,
    verifyToken: string,
    verificationExpiry: number,
    createdAt: Date,
    updatedAt: Date
}