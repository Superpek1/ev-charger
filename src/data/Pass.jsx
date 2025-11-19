const users = [
    {
        user: 'user',
        pass: 'pass',
        role: 'admin',
        token: 'user',
    }
];

export function verifyUser(username, password) {
    
    const userFound = users.find((u) => {
        return u.user === username && u.pass === password;
    });

    return userFound ? { role: userFound.role, token: userFound.token } : null; 
}