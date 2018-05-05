'use strict';



exports.login = function(req, res, next) {
    //check if user exists
    res.redirect('/admin/content');
};
