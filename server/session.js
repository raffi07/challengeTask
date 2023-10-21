const uuid = require('uuid');

function generateSessionToken() {
    return uuid.v4(); // Generates a random UUID
}

module.exports = {
    generateSessionToken,
};