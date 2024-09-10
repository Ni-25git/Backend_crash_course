const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4500;

// Middleware for body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration
const multerConfig = {
  storage: multer.diskStorage({
    destination: function (req, file, next) {
      const dir = path.join(__dirname, '/uploads/photo-storage');
      // Check if the directory exists, if not, create it
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      next(null, dir);
    },

    filename: function (req, file, next) {
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
  }),

  fileFilter: function (req, file, next) {
    if (!file) {
      return next();
    }
    const isImage = file.mimetype.startsWith('image/');
    if (isImage) {
      console.log('Photo uploaded');
      next(null, true);
    } else {
      console.log('File not supported');
      return next(new Error('File type not supported'), false);
    }
  }
};

// Route for serving the upload form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST route for handling file upload
app.post('/upload', multer(multerConfig).single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded or unsupported file format');
  }
  res.status(200).send('File uploaded successfully');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
