exports.isNotAuth = (req, res, next) => {
    if (!req.session.userID) next();
    else res.redirect('/');
}
exports.isAuth = (req, res, next) => {
    if (req.session.userID) next();
    else res.redirect('/');
}