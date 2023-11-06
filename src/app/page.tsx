"use client";

import { ChangeEvent, useEffect, useState } from "react";
import styles from "./page.module.css";
import Contact from "@/components/contact";
import { Button } from "@/components/button";
import useContactsReducer from "@/hooks/reducers/contacts.reducer";

import { Contact as ContactType } from "@/types/contact.type";
import { Search } from "@/components/search";
import CreateOrEditContact from "@/components/edit-contact";
import { fetchContacts } from "@/lib/fetch-contacts";
import { createContacts } from "@/lib/create-contact";
import { updateContact } from "@/lib/update-contact";
import { deleteContact } from "@/lib/remove-contact";

export default function Home() {
  const [contactsState, dispatch] = useContactsReducer();
  const { contacts, selectedContact, enableCreateOrEditContact } =
    contactsState;

  const [filteredContacts, setFilteredContacts] = useState<ContactType[]>([]);

  useEffect(() => {
    fetchContacts(dispatch);
  }, [enableCreateOrEditContact]);

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  const selectedContactDetails = (contact: ContactType) => {
    dispatch({ type: "SELECTED_CONTACT_DETAILS", payload: contact });
  };

  const openModal = async () => {
    dispatch({ type: "ENABLE_CREATE_OR_EDIT_CONTACT", payload: true });
  };

  const closeModal = async () => {
    dispatch({ type: "ENABLE_CREATE_OR_EDIT_CONTACT", payload: false });
  };

  const saveUpdatedContact = async (contact: ContactType) => {
    await updateContact(dispatch, contact);
  };

  const createNewContact = async (contact: ContactType) => {
    await createContacts(dispatch, contact);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredContacts = contacts.filter((contact) =>
      contact.searchIndex?.includes(e.target.value)
    );
    setFilteredContacts(filteredContacts);
  };

  return (
    <main className={styles.main}>
      <div
        style={{
          marginBottom: "4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Search
          type="text"
          name="search"
          placeholder="Search your contacts.."
          onChange={(e) => handleSearch(e)}
        />
        <Button onClick={openModal}>Add Contact</Button>
      </div>

      {enableCreateOrEditContact && (
        <CreateOrEditContact
          isOpen={true}
          onCancel={closeModal}
          onSave={selectedContact ? saveUpdatedContact : createNewContact}
          contact={selectedContact}
        />
      )}

      <div
        style={{
          display: "flex",
          flexFlow: "column wrap",
          height: "650px",
        }}
      >
        {filteredContacts.map((contact) => {
          const show = selectedContact?.id === contact.id;
          return (
            <>
              {!show ? (
                <div
                  className="cursor-pointer"
                  onClick={() => selectedContactDetails(contact)}
                >
                  <Contact
                    key={contact.id}
                    contact={contact}
                    show={show}
                  ></Contact>
                </div>
              ) : (
                <Contact
                  key={contact.id}
                  contact={contact}
                  show={show}
                  onRemove={() => deleteContact(dispatch, contact)}
                  onSave={() => openModal()}
                ></Contact>
              )}
            </>
          );
        })}
      </div>
    </main>
  );
}
