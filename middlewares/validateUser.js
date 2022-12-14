const { RequestError } = require("../helpers");

const validateUser = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(RequestError(400, "Ошибка от Joi или другой библиотеки валидации"));
        }
        next()
    }

    return func;
}

module.exports = validateUser;