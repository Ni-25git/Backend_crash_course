const os = require('os');
const crypto = require('crypto');
const uuid = require('uuid');
const fs = require('fs');
const { pipeline } = require('stream');

// Generate a random key and IV
const key = crypto.randomBytes(32); // AES-256 requires a 32-byte key
const iv = crypto.randomBytes(16); // AES requires a 16-byte IV

const operation = process.argv[2];

switch (operation) {
    case 'arch':
        console.log(os.arch());
        break;

    case 'cpus':
        console.log(os.cpus());
        break;

    case 'hostname':
        console.log(os.hostname());
        break;

    case 'network':
        console.log(os.networkInterfaces());
        break;

    case 'userInfo':
        console.log(os.userInfo());
        break;

    case 'HelloGoodMorning':
        // Encrypt the message
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(operation, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        console.log(`Key: ${key.toString('hex')}`);
        console.log(`IV: ${iv.toString('hex')}`);
        console.log(`Encrypted message: ${encrypted}`);

        // Decrypt the message
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        console.log(`Decrypted message: ${decrypted}`);
        break;

    case 'readFileComparison':
        const filePath = './test.txt'; // Ensure you have a large text file at this path
        
        // Reading file with traditional fs.readFile
        console.time('fs.readFile');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            console.timeEnd('fs.readFile');
        });

        // Reading file with streams
        console.time('Stream');
        const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        readStream.on('end', () => {
            console.timeEnd('Stream');
        });

        // Handling errors
        readStream.on('error', (err) => {
            console.error(`Stream Error: ${err.message}`);
        });
        
        break;

    default:
        console.log(`Invalid operation: ${operation}`);
        break;
}
