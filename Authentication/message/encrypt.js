const crypto = require('crypto');
require('dotenv').config()


const key = Buffer.from(process.env.SECRET_KEY, 'hex');
const iv = crypto.randomBytes(16); 

const encrypt = (message) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedMessage: encrypted };
};

module.exports = encrypt;
