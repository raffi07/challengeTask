const uuid = require('uuid');
const generateSessionToken = () => {
    return uuid.v4(); // Generates a random UUID
}