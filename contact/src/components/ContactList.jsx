import React, { useState } from "react";

const ContactList = ({ contacts, deleteHandle }) => {

  const [contactsData, setContactsData] = useState(null);

  const getLocalStorage = () => {
    const getContacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(getContacts);
    return parseContacts;
  };

  const localStorageHandle = () => {
    let contactss = getLocalStorage();
    if (contactss === null || undefined || contactss.lenght === 0) {
      contactss = contacts;
      return contactss;
    } else {
      contactss = getLocalStorage();
      return contactss;
    }
  };

  const newContacts = localStorageHandle();

  return (
    <div>
      <div>
        {newContacts.map((contact) => {
          const { name, lastName, email, phone, id } = contact;
          return (
            <div key={id}>
              <h3>name:{name}</h3>
              <h3>last-name:{lastName}</h3>
              <h3>email:{email}</h3>
              <h3>phone:{phone}</h3>
              <button onClick={() => deleteHandle(id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactList;
