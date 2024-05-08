const asynHandler = require("express-async-handler")
const Blog = require("../model/Blog")
const { upload } = require("../util/upload")
const fs = require("fs/promises")
const path = require("path")

exports.getblog = asynHandler(async (req, res) => {
    const result = await Blog.find()
    res.status(200).json({ message: "blog fetch succes", result })
})
exports.addblog = asynHandler(async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            res.status(400).json({ message: "unable to upload iamge" })
        }
        Blog.create({ ...req.body, hero: req.file.filename })
        res.status(200).json({ message: "blog create succes" })
    })
})
exports.deleteBlog = asynHandler(async (req, res) => {
    const { blogId } = req.params
    const result = await Blog.findById(blogId)
    await fs.unlink(path.join(__dirname, "..", "uploads", result.hero))

    await Blog.findByIdAndDelete(blogId)
    res.status(200).json({ message: "blog delete succes" })
})
exports.updateBlog = asynHandler(async (req, res) => {
    const { blogId } = req.params
    await Blog.findByIdAndUpdate(blogId, req.body)
    res.status(200).json({ message: "blog update succes" })
})