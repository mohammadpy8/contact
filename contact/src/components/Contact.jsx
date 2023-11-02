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

  const removeContactLocalStorage = () => {
    const reCo = localStorage.removeItem("contacts");
    return reCo;
  };

  const deleteHandle = (id) => {
    const deleteContacts = contacts.filter((items) => items.id !== id);
    toast.success("حذف شذ");
    console.log(deleteContacts);
    setContacts(deleteContacts);
    removeContactLocalStorage();
  };
  console.log(contacts);

  const generateID = () => {
    const ID = crypto.randomUUID();
    return ID;
  };

  const changeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact({ ...contact, [name]: value, id: generateID() });
  };
  console.log(contacts);

  const addHandle = () => {
    if (
      contact.email === "" ||
      contact.lastName === "" ||
      contact.name === "" ||
      contact.phone === ""
    ) {
      toast.error("تمام فیلد ها را پر کنید");
    } else {
      saveLocalStorage(contacts);
      setContacts((contacts) => [...contacts, contact]);
      toast.success("شماره تلفن با موفقیت ثبت شد!");
      setContact({
        name: "",
        lastName: "",
        email: "",
        phone: "",
      });
    }
  };
  const saveLocalStorage = (value) => {
    const saveLocal = localStorage.setItem("contacts", JSON.stringify(value));
    return saveLocal;
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
      <ContactList contacts={contacts} deleteHandle={deleteHandle} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Contact;
