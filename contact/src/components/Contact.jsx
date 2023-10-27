import React, { useState } from "react";
import ContactList from "./ContactList";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const changeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact({ ...contact, [name]: value });
  };

  const addHandle = () => {
    setContacts((contacts) => [...contacts, contact]);
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
      <ContactList contacts={contacts} />
    </div>
  );
};

export default Contact;
