/**
 * ArticleController
 *
 * @description :: Server-side logic for managing Articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    new: function (req, res) {
        Article.create({
            name: req.param('name')
        }, function (err, data) {
            if (err) return res.negotiate(err);
            return res.redirect('/explore');
        });
    }
};

