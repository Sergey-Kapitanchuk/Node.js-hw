const { Contact } = require("../../models/contact");

const { RequestError } = require("../../helpers");

const deleteById = async (req, res) => {

    const { contactId } = req.params;
    const result = await models.removeContact(contactId);
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json({
        message: "contact deleted"
    })
};

module.exports = deleteById;