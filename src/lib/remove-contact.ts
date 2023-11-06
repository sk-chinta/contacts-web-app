import { removeContact } from "@/api/contacts.api";
import { Action } from "@/actions/contacts.actions";
import { Dispatch } from "react";
import { Contact } from "@/types/contact.type";

export const deleteContact = async (
  dispatch: Dispatch<Action>,
  contact: Contact
) => {
  try {
    dispatch({ type: "REMOVE_CONTACTS" });
    await removeContact(contact.id);

    dispatch({ type: "REMOVE_CONTACTS_SUCCESS", payload: contact.id });
  } catch (error) {
    dispatch({ type: "REMOVE_CONTACTS_FAILURE" });
  }
};
