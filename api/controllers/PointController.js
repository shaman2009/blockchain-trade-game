/**
 * PointController
 *
 * @description :: Server-side logic for managing Points
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    query: function (req, res) {
        const userId = req.session.me;
        Point.findOne({ user: userId }).exec(function (err, data) {
            if (err) return res.negotiate(err);
            return res.view('point/home', {
                point: data
            });
        });
    }
};

