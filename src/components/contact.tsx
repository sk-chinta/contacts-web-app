"use client";

import { Card, CardContent, CardFooter } from "@/components/card";
import { Avatar } from "@/components/image";
import { Button } from "./button";
import { Contact } from "@/types/contact.type";

export type ContactProps = {
  contact: Contact;
  show: boolean;
  onRemove?: () => void;
  onSave?: () => void;
};

export default function Contact(props: ContactProps) {
  const hide = !props.show ? "hide" : "";
  const remove = () => {
    if (props.onRemove) {
      props.onRemove();
    }
  };

  const save = () => {
    if (props.onSave) {
      props.onSave();
    }
  };

  return (
    <div>
      <Card key={props.contact.id} className="pt-3">
        <CardContent>
          <div className="flex justify-between items-center">
            <Avatar src={props.contact.avatar} />
            <div>
              <div className="text-xs font-semibold font-medium">
                {props.contact.name}
              </div>
              <div className={`text-xs text-muted-foreground ${hide}`}>
                {props.contact.birthday}
              </div>
            </div>
          </div>
          <div className={`mt-6 ${hide}`}>
            <div className="text-xs font-semibold font-medium">
              {props.contact.phone}
            </div>
            <p className="text-xs text-muted-foreground">
              {props.contact.email}
            </p>
            <p className="text-xs text-muted-foreground">
              created on {props.contact.createdAt}
            </p>
          </div>
        </CardContent>
        <div className={`${hide}`}>
          <CardFooter>
            <Button data-cy="remove-contact-button" onClick={remove}>
              Remove
            </Button>
            <Button data-cy="edit-contact-button" onClick={save}>
              Edit
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
