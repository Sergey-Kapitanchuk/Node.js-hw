const { model, Schema } = require("mongoose");
const Joi = require('joi');

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

// const handlSaveErrors = (error, data, next) => {
//     const { name, code } = error;
//     error.status = (name === "MongoServerError" && code === 1100) ?
// }

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/\+?[0-9\s\-/(/)]+/, "numbers").required(),
    favorite: Joi.boolean(),
});

const schemas = {
    addSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};

