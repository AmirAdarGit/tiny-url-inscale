

export const parsePostQueryToString = (userEmail: String, userName: String, userPasswor: String): string => {
    return `INSERT INTO Tiny_URL.Users VALUES ( '${userEmail}', '${userName}', '${userPasswor}')`
}

export const parseGetQueryToString = (userEmail: String): String => {
return `SELECT UserPassword FROM Tiny_URL.Users where Email = '${userEmail}'`
}