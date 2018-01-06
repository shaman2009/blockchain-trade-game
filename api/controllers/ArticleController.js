/**
 * ArticleController
 *
 * @description :: Server-side logic for managing Articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    new: function (req, res) {
        req.file('file').upload({
            maxBytes: 10000000
        }, function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }
            Article.create({
                name: req.param('name'),
                owner: req.session.me,
                fileFd: uploadedFiles[0].fd
            }, function (err, data) {
                if (err) return res.negotiate(err);
                return res.redirect('/explore');
            });
        });
    },
    explore: function (req, res) {
        Article.find({}, function (err, data) {
            if (err) return res.negotiate(err);
            return res.view('article/explore', {
                articles: data
            });
        });
    },
    file: function (req, res) {

        req.validate({
            id: 'string'
        });

        Article.findOne(req.param('id')).exec(function (err, article) {
            if (err) return res.negotiate(err);
            if (!article) return res.notFound();

            if (!article.fileFd) {
                return res.notFound();
            }

            var SkipperDisk = require('skipper-disk');
            var fileAdapter = SkipperDisk(/* optional opts */);

            // set the filename to the same file as the article uploaded
            res.set("Content-disposition", "attachment; filename='" + article.name + "'");

            // Stream the file down
            fileAdapter.read(article.fileFd)
                .on('error', function (err) {
                    return res.serverError(err);
                })
                .pipe(res);
        });
    }
}
