import { createContact } from "@/api/contacts.api";
import { Action } from "@/actions/contacts.actions";
import { Dispatch } from "react";
import { Contact } from "@/types/contact.type";

export const createContacts = async (
  dispatch: Dispatch<Action>,
  contact: Contact
) => {
  try {
    dispatch({ type: "CREATE_CONTACT" });
    const newContact = await createContact(contact);

    dispatch({ type: "CREATE_CONTACT_SUCCESS", payload: newContact });
  } catch (error) {
    dispatch({ type: "CREATE_CONTACT_FAILURE" });
  }
};
