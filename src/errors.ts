export const throwError = (message: string) => {
    throw new Error(message);
}

export const enum Errors {
    TOKEN_IS_NOT_PROVIDED = 'Token is not provided.',
    USER_DATA_IS_NOT_PROVIDED = 'Telegram User data is not provided.',
}
