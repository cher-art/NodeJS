import { contacts } from "./contactsModule.js"
// const contacts = require("../db/contacts.json");
// const { v4 } = require("uuid")

// class ContactFunction {
//   listContacts(req, res) {
//     return res.status(200).json(contacts);
//   }
//   getById = (req, res) => {
//     const { id } = req.params;
//     const contactId = parseInt(id);
//     const contactIndex = contacts.findIndex(({ id }) => id === contactId);
//     return res.status(200).send(contacts[contactIndex]);
//   };
//   addContact(req, res, next) {
    // const { body } = req;
    // const newContacts = {
    //   id: Date.now(),
    //   ...body,
    // };
    // contacts.push(newContacts);
    // return res.status(201).send(newContacts);
//   }
//   updateContact = (req, res, next) => {
//     const { id } = req.params;
//     const contactId = parseInt(id);
//     const contactIndex = contacts.findIndex(({ id }) => id === contactId);
//     const updateContact = {
//       ...contacts[contactIndex],
//       ...req.body,
//     };
//     contacts[contactIndex] = updateContact;

//     res.status(200).send(updateContact);
//   };
//   removeContact = (req, res) => {
//     const { id } = req.params;
//     const contactId = parseInt(id);
//     const contactIndex = contacts.findIndex(({ id }) => id === contactId);
//     contacts.splice(contactIndex, 1);
//     res.status(200).send({ message: "contact deleted" });
//   };
// }

// module.exports = new ContactFunction();

async function listContacts (req, res, next) {
  try{
    res.status(200).json(contacts);
  } catch (error){
    next(error)
  }
}

async function getById (req, res, next) {
  try{
    const { id } = req.params;
    const contactId = parseInt(id);
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    res.status(200).send(contacts[contactIndex]);
  } catch (error){
    next(error)
  }
}

async function addContact (req, res, next) {
  try{
    const { body } = req;
    const newContacts = {
      id: Date.now(),
      ...body,
    };
    contacts.push(newContacts);
    res.status(201).send(newContacts);
  } catch (error){
    next(error)
  }
}

async function updateContact (req, res, next) {
  try{
    const { id } = req.params;
    const contactId = parseInt(id);
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    const updateContact = {
      ...contacts[contactIndex],
      ...req.body,
    };
    contacts[contactIndex] = updateContact;

    res.status(200).send(updateContact);
  } catch (error){
    next(error)
  }
}

async function removeContact (req, res, next) {
  try{
    const { id } = req.params;
    const contactId = parseInt(id);
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    contacts.splice(contactIndex, 1);
    res.status(200).send({ message: "contact deleted" });
  } catch (error){
    next(error)
  }
}

export {listContacts, getById, addContact, updateContact, removeContact}

