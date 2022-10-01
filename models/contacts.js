const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (list) => await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

const listContacts = async () => {
  const list = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(list);
}

const getContactById = async (contactId) => {
  const list = await listContacts();
  const result = list.find(contact => contact.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const list = await listContacts();
  const index = list.findIndex(contact => contact.id === contactId);
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
    id: nanoid(3),
    name,
    email,
    phone,
  };
  list.push(newContact);
  await updateContacts(list);
  return newContact;
}

const updateContact = async (contactId, { name, email, phone }) => {
  const list = await listContacts();
  const index = list.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  list[index] = { contactId, name, email, phone };
  await updateContacts(list);
  return list[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
