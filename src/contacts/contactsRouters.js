import pkf from "express"
import { listContacts, getById, addContact, updateContact, removeContact} from "./contactsFunction.js"
import { contactValidationCreate, contactValidationUpdate, contactValidationId } from "./contactsValidate.js"

// const { Router } = require("express");
// const ContactFunction = require("./contactsFunction.js");
// const ValidateContacts = require("./contactsValidate.js");

const { Router } = pkf

const router = Router();

router.get("/", listContacts);

router.get("/:id", contactValidationId, getById);

router.post(
  "/",
  contactValidationCreate,
  addContact
);
router.delete(
  "/:id",
  contactValidationId,
  removeContact
);
router.patch(
  "/:id",
  contactValidationUpdate,
  contactValidationId,
  updateContact
);

export default router
