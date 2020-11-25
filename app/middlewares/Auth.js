class Auth {
    clientAuth(req, res, next) {
        if ((req.session.user != undefined) || (req.session.user != null)) {
            next();
        } else {
            res.redirect('/')
        }
    }
}
module.exports = new Auth();