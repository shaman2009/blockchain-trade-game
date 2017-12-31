/**
 * PointController
 *
 * @description :: Server-side logic for managing Points
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    query: function (req, res) {
        const userId = req.session.me;
        const INITIAL_AMOUT = 10;
        Point.findOne({ user: userId }).exec(function (err, data) {
            if (err) return res.negotiate(err);
            if (data == null){
                Point.create({user: userId, amount: INITIAL_AMOUT}).exec(function(err, data) {
                    if (err) return res.negotiate(err);
                    return res.view('point/home', {
                        point: data
                    });
                });
            } else {
                return res.view('point/home', {
                    point: data
                });
            }
        });
    }
};

