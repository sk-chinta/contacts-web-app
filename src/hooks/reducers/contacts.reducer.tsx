import { Action } from "@/actions/contacts.actions";
import { InitialState } from "@/types/contact.type";
import { useReducer } from "react";

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "GET_CONTACTS": {
      return {
        ...state,
        contacts: [],
        isLoading: true,
      };
    }
    case "GET_CONTACTS_SUCCESS": {
      const contacts = action.payload.map((contact) => {
        return {
          ...contact,
          searchIndex: `${contact.name}_${contact.phone}_${contact.email}`,
        };
      });
      return {
        ...state,
        contacts,
        isLoading: false,
      };
    }
    case "GET_CONTACTS_FAILURE": {
      return {
        ...state,
        contacts: [],
        isLoading: false,
      };
    }
    case "REMOVE_CONTACTS": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "REMOVE_CONTACTS_SUCCESS": {
      const updatedContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      return {
        ...state,
        contacts: updatedContacts,
        selectedContact: null,
        isLoading: false,
      };
    }
    case "REMOVE_CONTACTS_FAILURE": {
      return {
        ...state,
        contacts: [],
        isLoading: false,
      };
    }

    case "UPDATE_CONTACT": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "UPDATE_CONTACT_SUCCESS": {
      const updatedContacts = state.contacts.map((contact) => {
        if (contact.id === action.payload.id) {
          return {
            ...action.payload,
            searchIndex: `${contact.name}_${contact.phone}_${contact.email}`,
          };
        }
        return contact;
      });
      return {
        ...state,
        contacts: updatedContacts,
        selectedContact: null,
        enableCreateOrEditContact: false,
        isLoading: false,
      };
    }
    case "UPDATE_CONTACT_FAILURE": {
      return {
        ...state,
        contacts: [],
        isLoading: false,
      };
    }

    case "CREATE_CONTACT": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "CREATE_CONTACT_SUCCESS": {
      const contact = {
        ...action.payload,
        searchIndex: `${action.payload.name}_${action.payload.phone}_${action.payload.email}`,
      };
      const updatedContacts = [...state.contacts, contact];
      return {
        ...state,
        contacts: updatedContacts,
        selectedContact: null,
        enableCreateOrEditContact: false,
        isLoading: false,
      };
    }
    case "CREATE_CONTACT_FAILURE": {
      return {
        ...state,
        contacts: [],
        isLoading: false,
      };
    }

    case "SELECTED_CONTACT_DETAILS": {
      return {
        ...state,
        selectedContact: action.payload,
      };
    }
    case "CANCEL_CONTACT_VIEW": {
      return {
        ...state,
        selectedContact: null,
      };
    }
    case "ENABLE_CREATE_OR_EDIT_CONTACT": {
      return {
        ...state,
        enableCreateOrEditContact: action.payload,
      };
    }
    default:
      throw Error("Unknown action");
  }
}

const initialState: InitialState = {
  contacts: [],
  selectedContact: null,
  isLoading: false,
  enableCreateOrEditContact: false,
};

export default function useContactsReducer() {
  return useReducer(reducer, initialState);
}
