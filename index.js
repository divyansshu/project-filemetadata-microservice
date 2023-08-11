const express = require('express');
const cors = require('cors');
require('dotenv').config()
const multer = require("multer");
const upload = multer();
const bodyParser = require("body-parser");

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req,res,next) => {

  const file = req.file;
  console.log(file);
res.json({name:file.originalname, type:file.mimetype, size:file.size});
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
