const Blogs = require('../models/Blog');

module.exports = {
    getAllBlogs: (req, res, next) => {
        Blogs.find({}, (err, blogs) => {
            if (err) return res.send({ message: 'There was an error..', err});
            return res.send({ message: 'All blogs were found!', blogs});
        })
        .catch((err) => next(err));
    },
    getOneBlog: (req, res, next) => {
        Blogs.findById({ _id: req.params.id }).then((blog) => {
            if (!blog) return res.send({ message: 'Blog was not found..' });
            return res.send({ message: 'Blog was found!', blog });
        })
        .catch((err) => next(err));
    },
    createBlog: async (req, res, next) => {
        try {
            const { title, subject, author, article } = req.body;
            let blog = await Blogs.create({
                title,
                subject,
                author,
                article
            });
            console.log(blog)
            blog.save()
                .then(blog => {
                    if (!blog) return res.send({ message: 'Blog could not save..'});
                    return res.send({ message: 'Blog was saved!', blog })
                })
                .catch((err) => console.log(err));
        } catch (err) {
            return console.log(err);
        }
    },
    updateBlog: (req, res, next) => {
        Blogs.findById({ _id: req.params.id }).then((blog) => {
            if (!blog) return res.send({ message: 'Could not find the blog..', blog });
            const { title, subject, author, article } = req.body;

            blog.title = title ? title : blog.title;
            blog.subject = subject ? subject : blog.subject;
            blog.author = author ? author : blog.author;
            blog.article = article ? article : blog.article;

            blog.save().then((blog) => {
                if (!blog) return res.send({ message: 'Could not update blog..'});
                return res.send({ message: 'Blog was updated!', blog })
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    },
    deleteBlog: (req, res, next) => {
        Blogs.findByIdAndDelete({ _id: req.params.id }).then((blog) => {
            if (err) return res.send({ message: 'Blog was not deleted..' });
            return res.send({ message: 'Blog was deleted!', blog });
        })
        .catch((err) => next(err));
    }
}