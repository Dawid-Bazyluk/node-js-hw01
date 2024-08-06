const fs = require("node:fs").promises;
const { nanoid } = require("nanoid");
const path = require("node:path");

const contactsPath = "./db/contacts.json";

function listContacts() {
  const file = fs.readFile(path.resolve(contactsPath));
  file.then((content) => {
    const fileStr = content.toString();
    console.table(JSON.parse(fileStr));
  });
}

function getContactById(contactId) {
  const file = fs.readFile(path.resolve(contactsPath));
  file.then((content) => {
    const fileStr = content.toString();
    const result = JSON.parse(fileStr);
    console.log(result.find((contact) => contact.id === contactId));
  });
}

function removeContact(contactId) {
  const file = fs.readFile(path.resolve(contactsPath));
  file.then((content) => {
    const fileStr = content.toString();
    const result = JSON.parse(fileStr);
    const afterDelete = result.filter((contact) => contact.id !== contactId);
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(afterDelete)).then(
      () => {
        console.log("The contact has been deleted".green);
      }
    );
  });
}

function addContact(name, email, phone) {
  const file = fs.readFile(path.resolve(contactsPath));
  file.then((content) => {
    const fileStr = content.toString();
      const result = JSON.parse(fileStr);
      const id = nanoid(21)
    result.push({
      id: id,
      name,
      email,
      phone,
    });
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(result)).then(
      () => {
        console.log(
          `Added new contact! Name: ${name}, Email: ${email}, Phone: ${phone}, id: ${id}`
            .green
        );
      }
    );
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
