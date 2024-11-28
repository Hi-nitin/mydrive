const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
  
    destination: (req, file, cb) => {
      cb(null, 'public/humpydumpy/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  
  const upload = multer({ storage });


  module.exports=upload