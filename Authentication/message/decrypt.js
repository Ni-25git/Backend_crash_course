const crypto = require('crypto');
require('dotenv').config()

// Use the same constant key
const key = Buffer.from(process.env.SECRET_KEY, 'hex');

const decrypt = (encryptedData) => {
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const encryptedMessage = Buffer.from(encryptedData.encryptedMessage, 'hex');
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
};

module.exports = decrypt;
