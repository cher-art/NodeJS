const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const searchContact = contacts.find((contact) => contact.id === contactId);
  return searchContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const editListContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  const newListContactsJson = JSON.stringify(editListContacts);
  fs.writeFile(contactsPath, newListContactsJson);
  return editListContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  let Id = 0;
  contacts.forEach((contact) => (Id = contact.id));
  const newContact = {
    id: Id + 1,
    name,
    email,
    phone,
  };
  const newContactsList = [...contacts, newContact];
  const newContactJson = JSON.stringify(newContactsList);
  fs.writeFile(contactsPath, newContactJson);
  return newContactsList;
}

// function listContacts() {
//   fs.readFile(contactsPath)
//     .then((data) => console.log(data.toString()))
//     .catch((err) => console.log(err.message))
// }

// function getContactById(contactId) {
//   fs.readFile(contactsPath)
//   .then((files) => JSON.parse(files))
//   .then((contacts) => contacts.find(contact => contact.id === contactId))
//   .catch((err) => console.log(err.message))
// }

// function removeContact(contactId) {
//   fs.readFile(contactsPath)
//   .then((files) => JSON.parse(files))
//     .then((contacts) => contacts.filter(contact => contact.id !== contactId))
//     .catch((err) => console.log(err.message));
// }

// function addContact(name, email, phone) {
//   const newContact = {
//     name,
//     email,
//     phone,
//   };
//   fs.writeFile(contactPath).then(contacts => JSON.stringify([...contacts, newContact]))
//      .catch((err) => console.log(err.message));
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
