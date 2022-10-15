const { Contact } = require("../../models/contact");

const { RequestError } = require("../../helpers");

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await models.updateContact(contactId, req.body);
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json(result)
};

module.exports = updateById;