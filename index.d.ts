interface UserToken {
    id: String
    email: String
    name: String
}

declare module "express-serve-static-core" {
    interface Request {
        userToken: UserToken
    }
}