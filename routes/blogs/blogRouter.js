const express = require('express');
const router = express.Router();
const {
    getAllBlogs,
    getOneBlog,
    createBlog,
    updateBlog,
    deleteBlog
} = require('./blogController/blogController');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getOneBlog);
router.post('/createblog', createBlog);
router.put('/updateblog/:id', updateBlog);
router.delete('/deleteblog/:id', deleteBlog);

module.exports = router;
