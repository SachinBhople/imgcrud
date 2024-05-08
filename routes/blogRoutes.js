const { getblog, addblog, deleteBlog, updateBlog } = require("../controller/blogController")

const router = require("express").Router()

router

    .get("/", getblog)
    .post("/add-blog", addblog)
    .delete("/delete-blog/:blogId", deleteBlog)
    .put("/update-blog", updateBlog)

module.exports = router