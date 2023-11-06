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
    <main className="main">
      <div className="p-2-sm flex flex-wrap justify-between items-center mb-8">
        <Search
          type="text"
          data-cy="search-contacts"
          name="search"
          placeholder="Search your contacts.."
          onChange={(e) => handleSearch(e)}
        />
        <Button data-cy="add-contact" onClick={openModal}>
          Add Contact
        </Button>
      </div>

      {enableCreateOrEditContact && (
        <CreateOrEditContact
          isOpen={true}
          onCancel={closeModal}
          onSave={selectedContact ? saveUpdatedContact : createNewContact}
          contact={selectedContact}
        />
      )}

      <div className="masonary">
        {filteredContacts.map((contact, index) => {
          const show = selectedContact?.id === contact.id;
          return (
            <>
              {!show ? (
                <div
                  data-cy={`contact-card`}
                  className="cursor-pointer"
                  onClick={() => selectedContactDetails(contact)}
                >
                  <Contact
                    data-cy={`contact-card-${index}`}
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
