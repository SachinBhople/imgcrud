const multer = require("multer")
const { v4: uuid } = require("uuid")
const path = require("path")

const profilestorag = multer.diskStorage({
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const fn = uuid() + ext
        cb(null, fn)
    },
    destination: (req, file, cb) => {
        cb(null, "uploads")
    }
})

exports.upload = multer({ storage: profilestorag }).single("hero")