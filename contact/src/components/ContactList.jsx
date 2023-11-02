import React from "react";

const ContactList = ({ contacts,deleteHandle }) => {

  const getLocalStorage = () => {
    const getContacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(getContacts);
    return parseContacts;
  };

  const contactss = getLocalStorage();
  console.log(contacts);
  return (
    <div>
      <div>
        {contacts.map((contact) => {
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
