// npm init -y     // package.json
// npm i nodemon -D  // automata server, nem kell változásoknál leállítani ujraelinditani a servert
// package.json
// "scripts": {
//   "start": "nodemon index.js"
// },
// npm run start

// toptal.com/developers/gitignore    // .gitignor generátor

//-------------------------------------------------------------------
// localhost:3000/students/5          // path paraméter
// .hu/mod/lesson/edit.php?id=4501    // query string

//-------------------------------------------------------------------
// express

const express = require('express');           // npm i express
const createError = require('http-errors')    // npm i http-errors  // hibakezelésre

const app = express();
const port = 3000;

//-------------------------------------------------------------------
// morgan
const morgan = require('morgan')              // npm i morgan       // MINDEN http kérést logol

// app.use(morgan('tiny'));       // logolási formátum === tiny
// app.use(morgan('dev'));        // logolási formátum === dev
// app.use(morgan('combined'));   // logolási formátum === combined
// const logger = require('./config/logger.js')  
app.use(morgan('combined', {stream: logger.stream}));  // a logger.stream egy fgv és a logger-be definiáltuk
// összeköttöttem a loggerrel és fileba is ír, a loggar === winston

//-------------------------------------------------------------------
// body-parser          // express 4.16 alatt csak bodyParser van !! 
// const bodyParser = require('body-parser')     // npm i body-parser
// app.use(bodyParser.json()); // ha van body átparsolja a bodyt

//-------------------------------------------------------------------
// index.js

// express 4.16 felett van beépített body-parser =>
app.use(express.json()); // ha van body akkor átparsolja a bodyt

app.use((req, res, next) => {     // middleware         // elöször ez fut le
  // console.log(req.url,req.method,req.httpVersion);
  next()    // azé kell hogy a get is lefusson, tovább fusson
})

// Útvonalak definiálása // API végpont
app.use('/person', require('./controller/controller.js'));    // "/person" esetén a controllernek átadja a vezérlést
app.post('*', (req, res) => {})     // joker utvonal, bármely

// Statikus Angular projekt
app.use(express.static('public'));
// statikus file-ok
app.use('/static', express.static('./public'));    // localhost:3000/static/img/kastély.jpg
// statikus file letöltése
app.use('/download/:img', (req, res) => {res.download('./public/img/' + req.params.img);})

// Minden egyéb hívás átirányítása az Angular index.html fájljára
app.use((req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.use((req, res, next)=> {      // ha eddig eljutottunk az azt jelenti hogy olyan url-t kaptunk ami nem létezik
  return next(new createError.BadRequest('Not found'))  // továbdobbjuk a kövi middleware-nek
  // minden olyan kövi middleware-t kihagy ami nem hibát kezel, csak a hibásra fut rá
})

app.use((err, req, res, next) => {                      // ez a hibát kezeli, ha volt akkor jutunk ide
  res.status(err.statusCode || 500);
  res.json({                                            // a válaszunk ez az objekt lesz
    hasError: true,
    message: err.message
  })
})

app.listen(port, () => {              // szerver indítása
    console.log(`App is listening at http://localhost:${port}`);
});

//-------------------------------------------------------------------
// controller.js            // kéréseket szolgál ki

const express = require('express')  
const createError = require('http-errors')    // npm i http-errors
// email validációra =>                       // npm i email-validator
const data = require('../data.js')            // itt csak az adatok vannak MOOK adatok

const controller = express.Router()           // routert csinál 

// READ get all '/'
controller.get('/',(req, res) => {    // relatív elérés
  res.json(data)
})

// get /:id
controller.get('/:id', (req, res,next) => {
  const id = +req.params.id;
  const person = data.find(person => person.id === id);
  if (person===undefined) {
    return next(new createError.BadRequest('Invalid ID'))
  }
  res.status(200);
  res.json(person);
})

// creat
controller.post('/', (req, res, next) => {
  if (!req.body["first_name"] || !req.body["last_name"] || !req.body["email"]) {
    return next(new createError.BadRequest('Missing properties'))
  }
  const {first_name,last_name,email} = req.body;
  const newPerson = {first_name,last_name,email,id:data[data.length-1].id + 1}
  data.push(newPerson);       // szerverre írunk
  res.status(201);            // válaszunk státusza
  res.json(newPerson);        // válaszunk ez lesz
})

// update /:idd
controller.put('/:idd', (req, res, next) => {
  const id = +req.params.idd; // mivel a paraméterek stringek, ugy hivóm ahogy a /: utána
  const index = data.findIndex(person => person.id === id);
  if (index === -1) {
    return next(new createError.BadRequest('Invalid ID'))
  }
  const {first_name,last_name,email} = req.body;
  data[index]={first_name,last_name,email,id:id}
  // res.status(201);
  res.send(data[index])   // a statust az express intézi a .send -el
})

// delete /:id
controller.delete('/:id', (req, res, next) => {
  const id = +req.params.id;
  const index = data.findIndex(person => person.id === id);
  if (index === -1) {
    return next(new createError.BadRequest('Invalid ID'))
  }
  data.splice(index, 1)
  res.send({})  // a statust az express intézi a .send -el
})

// Az API végpontokat megvalósító routerek aljára érdemes lehet hibakezelést tenni, 
// hogy nem kezelt API hívás esetén ne az index.html legyen elküldve, hanem egy hibaüzenet, 
// amit majd a hibakezelő middleware alakít tovább:
controller.use((req, res, next) => {
  return next(new createError.BadRequest('Endpoint does not exist'));
})

module.exports = controller;

//-------------------------------------------------------------------
// winston    // logger.js    // ő a logoló     // mit hova írj ki? erre jó, logok naplózásához

const winston = require('winston')              // npm i winston    
const path = require('path')                  

const options ={
  console:{
    level:'debug',       // fontossági szint, a debug és a feletti szinteket is logolja
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
      // winston.format.json()
    )
  },
  file:{
    level:'info',
    filename: path.join(__dirname,'../../logs/app.log'),
    format: winston.format.json()
  }
}

const logger = winston.createLogger({
  format: winston.format.simple(),    // mindenre vonatkozik amit nem definiálok az optionsban
  transports: [
    new winston.transports.Console(options.console),                          // conzolra ír
    new winston.transports.File(options.file)                                 // és fileba is
  ],
  exitOnError: false        // false => error esetén nem ál le a logolás 
})

logger.stream = {write: (message, encoding) => {logger.info(message)}}; 

module.exports = logger

// máshol behúzva => 
const logger = require('./config/logger.js')  
logger.info(err.statusCode,err.message)
logger.error(err.statusCode,err.message)
logger.debug(req.params.id)   // debug szibntű, csak a consolra ír

//-------------------------------------------------------------------




















/*
// FILE feltöltés 
// npm install --save multer

const multer = require('multer')

function fileFilter(req, file, cb) {
    // Csak képfájlok feltöltése engedélyezett
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Not an image file'));
    }
    cb(null, true);
}

const limits = {
    // Maximum 1 MB-os fájlok feltöltése engedélyezett
    // (alapértelmezetten nincs korlázotva)
    fileSize: 1 * 1024 * 1024
}

// Multer inicializálása (a fájlok az uploads mappába lesznek feltölve
const upload = multer({ dest: 'uploads/', fileFilter: fileFilter, limits })

// API végpont a képfeltöltéshez
app.post('/upload', upload.single('image'), function (req, res, next) {

    // Hibát dobunk vissza, ha nincs kiválasztva fájl
    if (!req.file) {
        return next(new createError.BadRequest('No file specified'));
    }

    // TODO: fájl elérési útjának (req.file.path) elmentése az adatbázisba
    // (most csak kilogoljuk a fájl adatait)
    console.log(req.file);

    res.json({ message: "Successfully uploaded image" });

})


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Image Upload</title>
</head>

<body>
    <form method="post" action="/upload" enctype="multipart/form-data">
        <input type="file" name="image" accept="image/*" /><br /><br />
        <button type="submit" name="upload">Upload</button>
    </form>
</body>

</html>



const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const router = express.Router();
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const campgrounds = require("../controllers/campgrounds");

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);
router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;



module.exports.createCampground = async (req, res) => {
    const geoData = await geocoder
        .forwardGeocode({
            query: req.body.campground.location,
            limit: 1,
        })
        .send();
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map((images) => ({
        url: images.path,
        filename: images.filename,
    }));
    campground.author = req.user._id;
    campground.createdAt = Date.now();
    await campground.save();

    req.flash("success", req.t("successCamp"));
    res.redirect(`/campgrounds/${campground._id}`);
};


module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
        ...req.body.campground,
    });
    const imgs = req.files.map((images) => ({
        url: images.path,
        filename: images.filename,
    }));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({
            $pull: { images: { filename: { $in: req.body.deleteImages } } },
        });
    }
    req.flash("success", req.t("successUpgCamp"));
    res.redirect(`/campgrounds/${campground._id}`);
};


const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "YelpCamp",
        allowedFormats: ["jpeg", "png", "jpg"],
    },
});

module.exports = {
    cloudinary,
    storage,
};