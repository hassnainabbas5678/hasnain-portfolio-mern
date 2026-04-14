import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({ ok: true, contact });
};

export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json({ ok: true, contacts });
};
