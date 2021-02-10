const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    fs.readFile(contactsPath, "utf-8").then((data) =>
      console.log(JSON.parse(data))
    );
  } catch {
    console.log("Error");
  }
}

async function getContactById(contactId) {
  try {
    fs.readFile(contactsPath, "utf-8")
      .then((data) => JSON.parse(data))
      .then((contacts) => contacts.find((contact) => contact.id === contactId))
      .then((contact) => console.log(contact));
  } catch {
    console.log("Error");
  }
}

async function removeContact(contactId) {
  try {
    fs.readFile(contactsPath, "utf-8")
      .then((files) => JSON.parse(files))
      .then((contacts) =>
        contacts.filter((contact) => contact.id !== contactId)
      )
      .then((contacts) => console.log(contacts));
  } catch {
    console.log("Error");
  }
}

async function addContact(name, email, phone) {
  try {
    fs.readFile(contactsPath, "utf-8")
      .then((data) => JSON.parse(data))
      .then(function (contacts) {
        let Id = 0;
        contacts.forEach((contact) => (Id = contact.id));
        const newContacts = {
          id: Id + 1,
          name,
          email,
          phone,
        };
        const newContactsList = [...contacts, newContacts];
        const newContactJson = JSON.stringify(newContactsList);
        fs.writeFile(contactsPath, newContactJson);
        return console.log(newContactsList);
      });
  } catch {
    console.log("Error");
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
