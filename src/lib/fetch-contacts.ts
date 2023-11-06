import { Action } from "@/actions/contacts.actions";
import { getContacts } from "@/api/contacts.api";
import { Dispatch } from "react";

export const fetchContacts = async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: "GET_CONTACTS" });
    const contacts = await getContacts();

    dispatch({ type: "GET_CONTACTS_SUCCESS", payload: contacts });
  } catch (error) {
    dispatch({ type: "GET_CONTACTS_FAILURE" });
  }
};
