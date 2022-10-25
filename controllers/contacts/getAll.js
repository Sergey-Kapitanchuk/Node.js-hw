const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    console.log(result);
    res.json(result)
};

module.exports = getAll;