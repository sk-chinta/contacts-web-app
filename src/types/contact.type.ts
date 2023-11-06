export type Contact = {
  avatar: string;
  birthday: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  searchIndex?: string;
};

export type InitialState = {
  contacts: Contact[];
  selectedContact: Contact | null;
  isLoading: boolean;
  enableCreateOrEditContact: boolean;
};
