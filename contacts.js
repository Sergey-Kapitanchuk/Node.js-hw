const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");
const updateContacts = async (list) => await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));


const listContacts = async () => {
    const list = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(list);
}

const getContactById = async (contactId) => {
    const stringId = String(contactId)
    const list = await listContacts();
    const result = list.find(contact => contact.id === contactId);
    return result || null;
}

const removeContact = async (contactId) => {
    const stringId = String(contactId)
    const list = await listContacts();
    const index = list.findIndex(contact => contact.id === stringId);
    if (index === -1) {
        return null;
    }
    const [result] = list.splice(index, 1);
    await updateContacts(list);
    return result
}

const addContact = async ({ name, email, phone }) => {
    const list = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    list.push(newContact);
    await updateContacts(list);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}