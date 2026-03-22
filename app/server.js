import express from "express"
import path from "path"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./uploads/")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    },
    fileFilter: (req, file, cb) => {
        if(req.files.length > 8) console.log("Invalid");
        cb(null, false)
    }
})

// upload middleware
const upload = multer({
    storage: storage,
    limits: 9
})

const app = express()

app.use(express.json())
app.use(express.static("."))

app.get("/", (req, res) => {
    res.send("Home page")
})


const uploadMiddleware = upload.fields([{ 
        name: 'avatar', maxCount: 1 
    }, 
    { 
        name: 'uploadfile', maxCount: 8 
    }
])

// handles uploads
app.post("/uploads", (req, res) => {
    
    uploadMiddleware(req, res, (err)=>{
        
        if(err instanceof multer.MulterError){
            res.status(400).send({"message": "Multer error occured while uploading the file or Max files reached"})
        }
        else if(err){
            res.status(400).send({"message": "An unknown error occured while uploading"})
        }
        else {
            console.log(req.method, req.url, req.body, (req.file || req.files) );
        res.status(200).send({ "msg": "Successful Upload" })
        }
    })
    // Cloud upload comes here

})


app.listen("4321", () => {
    console.log("Server is running up!!")
})