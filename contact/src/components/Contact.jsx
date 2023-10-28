import React, { useState } from "react";
import ContactList from "./ContactList";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const deleteHandle = (id) => {
    const deleteContacts = contacts.filter((items) => items.id !== id);
    setContacts(deleteContacts);
  };

  const generateID = () => {
    const ID = crypto.randomUUID();
    return ID;
  }

  const changeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact({ ...contact, [name]: value, id:generateID() });
  };

  const addHandle = () => {
    setContacts((contacts) => [...contacts, contact]);
    toast.success("شماره تلفن با موفقیت ثبت شد!");
    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={contact.name}
          onChange={changeHandle}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={contact.lastName}
          onChange={changeHandle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={changeHandle}
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={contact.phone}
          onChange={changeHandle}
        />
        <button onClick={addHandle}>Add Contact</button>
      </div>
      <ContactList contacts={contacts} deleteContacts={deleteHandle} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Contact;
