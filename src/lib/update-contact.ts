import { updateContact as updateContactApi } from "@/api/contacts.api";
import { Action } from "@/actions/contacts.actions";
import { Dispatch } from "react";
import { Contact } from "@/types/contact.type";

export const updateContact = async (
  dispatch: Dispatch<Action>,
  contact: Contact
) => {
  try {
    dispatch({ type: "UPDATE_CONTACT" });
    const updatedContact = await updateContactApi(contact);
    console.log("UPDATED Contact", updatedContact);
    dispatch({ type: "UPDATE_CONTACT_SUCCESS", payload: updatedContact });
  } catch (error) {
    dispatch({ type: "UPDATE_CONTACT_FAILURE" });
  }
};
