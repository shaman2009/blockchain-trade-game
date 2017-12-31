/**
 * ArticleController
 *
 * @description :: Server-side logic for managing Articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    new: function (req, res) {
        Article.create({
            name: req.param('name'),
            owner: req.session.me
        }, function (err, data) {
            if (err) return res.negotiate(err);
            return res.redirect('/explore');
        });
    },
    explore: function (req, res) {
        Article.find({}, function (err, data) {
            if (err) return res.negotiate(err);

            return res.view('article/explore', {
                articles: data
            });
        });
    }
};

