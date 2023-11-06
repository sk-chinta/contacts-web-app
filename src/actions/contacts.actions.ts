import { Contact } from "@/types/contact.type";

type GetContactsAction = { type: "GET_CONTACTS" };
type GetContactsSuccessAction = {
  type: "GET_CONTACTS_SUCCESS";
  payload: Contact[];
};
type GetContactsFailureAction = { type: "GET_CONTACTS_FAILURE" };

type RemoveContactsAction = { type: "REMOVE_CONTACTS" };
type RemoveContactsSuccessAction = {
  type: "REMOVE_CONTACTS_SUCCESS";
  payload: any;
};
type RemoveContactsFailureAction = { type: "REMOVE_CONTACTS_FAILURE" };

type CreateContactsAction = { type: "CREATE_CONTACT" };
type CreateContactsSuccessAction = {
  type: "CREATE_CONTACT_SUCCESS";
  payload: Contact;
};
type CreateContactsFailureAction = { type: "CREATE_CONTACT_FAILURE" };

export type UpdateContactsAction = { type: "UPDATE_CONTACT" };
type UpdateContactsSuccessAction = {
  type: "UPDATE_CONTACT_SUCCESS";
  payload: Contact;
};
type UpdateContactsFailureAction = { type: "UPDATE_CONTACT_FAILURE" };

type SelectedContactsDetails = {
  type: "SELECTED_CONTACT_DETAILS";
  payload: Contact;
};

type CancelContactView = {
  type: "CANCEL_CONTACT_VIEW";
};

type EnableCreateOrEditContact = {
  type: "ENABLE_CREATE_OR_EDIT_CONTACT";
  payload: boolean;
};

export type Action =
  | GetContactsAction
  | GetContactsSuccessAction
  | GetContactsFailureAction
  | SelectedContactsDetails
  | CancelContactView
  | RemoveContactsAction
  | RemoveContactsSuccessAction
  | RemoveContactsFailureAction
  | CreateContactsAction
  | CreateContactsSuccessAction
  | CreateContactsFailureAction
  | UpdateContactsAction
  | UpdateContactsSuccessAction
  | UpdateContactsFailureAction
  | EnableCreateOrEditContact;
