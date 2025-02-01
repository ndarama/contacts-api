// contacts-api/controllers/contactController.js
const Contact = require('../models/Contact');

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST a new contact
const createContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  try {
    const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    await newContact.save();
    res.status(201).json({ id: newContact._id });
  } catch (error) {
    res.status(400).json({ message: 'Error creating contact', error });
  }
};

// PUT (update) an existing contact
const updateContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, favoriteColor, birthday },
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: 'Error updating contact', error });
  }
};

// DELETE a contact
const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    // 204 No Content response indicates successful deletion.
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
