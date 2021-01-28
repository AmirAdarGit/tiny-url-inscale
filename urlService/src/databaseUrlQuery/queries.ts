
export const parseIsExistUrlQuery = (url: string): string => {
    return `SELECT * FROM Tiny_URL.Links where LongURL = '${url}'`
}


export const parseGetUrlQuery = (url: string): string => {
    return `SELECT ShortURL FROM Tiny_URL.Links where LongURL = '${url}' `
}


export const parseCreateUrlQuery = (url: string, email: string, isPrivate: boolean): string => {
    return `INSERT INTO Tiny_URL.Links (LongURL, Email, IsPrivate) VALUES ('${url}', '${email}', ${isPrivate});`
}

export const parseGetShortUrlQuery = (url: string): string => {
    return `SELECT ShortURL FROM Tiny_URL.Links WHERE LongURL = '${url}'`
}