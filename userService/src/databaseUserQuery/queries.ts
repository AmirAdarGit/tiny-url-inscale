

export const parseInsertQueryToString = (userEmail: string, userName: string, userPasswor: string): string => {
    return `INSERT INTO Tiny_URL.Users VALUES ( '${userEmail}', '${userName}', '${userPasswor}')`
}

export const parseGetQueryToString = (userEmail: string): string => {
return `SELECT UserPassword FROM Tiny_URL.Users where Email = '${userEmail}'`
}