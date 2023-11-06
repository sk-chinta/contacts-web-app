import { BASE_API } from "@/constants/contacts.constants";
import { Contact } from "@/types/contact.type";

export function getContacts(): Promise<Contact[]> {
  return fetch(`${BASE_API}/contacts`)
    .then((res) => {
      return res.json();
    })
    .then((data: Contact[]) => {
      return data.map<Contact>((contact) => {
        return { ...contact, disable: true };
      });
    });
}

export function removeContact(id: string) {
  return fetch(`${BASE_API}/contacts/${id}`, { method: "DELETE" })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
}

export function updateContact(contact: Contact): Promise<Contact> {
  return fetch(`${BASE_API}/contacts/${contact.id}`, {
    method: "PUT",
    body: JSON.stringify(contact),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
}

export function createContact(contact: Contact): Promise<Contact> {
  return fetch(`${BASE_API}/contacts`, {
    method: "POST",
    body: JSON.stringify(contact),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
}
