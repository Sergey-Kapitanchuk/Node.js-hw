const { RequestError } = require("../helpers");

const validFavoriteBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(RequestError(400, `missing field favorite`));
        }
        next()
    }

    return func;
}

module.exports = validFavoriteBody;

