"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Button } from "./button";
import { Input } from "./input";
import { Modal } from "./modal";
import { Contact } from "@/types/contact.type";
import { Formik, FormikHelpers } from "formik";

export type ContactProps = {
  contact: Contact | null;
  isOpen: boolean;
  onCancel?: () => void;
  onSave?: (contact: Omit<Contact, "searchIndex">) => void;
};

export default function CreateOrEditContact(props: ContactProps) {
  const { contact } = props;
  const cancel = () => {
    if (props.onCancel) {
      props.onCancel();
    }
  };

  const save = (contact: Omit<Contact, "searchIndex">) => {
    if (props.onSave) {
      props.onSave(contact);
    }
  };

  return (
    <>
      <Modal>
        <Card className="w-100 h-150 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contact Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                email: contact?.email ?? "",
                avatar: contact?.avatar ?? "",
                birthday: contact?.birthday ?? "",
                name: contact?.name ?? "",
                phone: contact?.phone ?? "",
                id: contact?.id ?? "",
                createdAt: contact?.createdAt ?? "",
              }}
              validate={(values) => {
                const errors: any = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.phone) {
                  errors.phone = "Required";
                }
                if (!values.name) {
                  errors.name = "Required";
                }
                return errors;
              }}
              onSubmit={(
                values: Omit<Contact, "searchIndex">,
                { setSubmitting }: FormikHelpers<Omit<Contact, "searchIndex">>
              ) => {
                setSubmitting(true);
                save(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <p data-cy="input-name-label" className="text-sm pb-2">
                    Enter name:
                    <span
                      data-cy="input-name-error"
                      className="text-red-700 pl-2"
                    >
                      {errors.name && touched.name && errors.name}
                    </span>
                  </p>
                  <Input
                    data-cy="input-name"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter name.."
                    name="name"
                    value={values.name}
                  />
                  <p data-cy="input-avatar-label" className="text-sm pb-2">
                    Enter avatar url:
                  </p>
                  <Input
                    data-cy="input-avatar"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter avatar url"
                    name="avatar"
                    value={values.avatar}
                  ></Input>

                  <p data-cy="input-email-label" className="text-sm pb-2">
                    Enter email:
                    <span
                      data-cy="input-email-error"
                      className="text-red-700 pl-2"
                    >
                      {errors.email && touched.email && errors.email}
                    </span>
                  </p>
                  <Input
                    data-cy="input-email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter email"
                    name="email"
                    value={values.email}
                  />
                  <p data-cy="input-dob-label" className="text-sm pb-2">
                    Enter dob:
                  </p>
                  <Input
                    data-cy="input-dob"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter dob"
                    name="birthday"
                    value={values.birthday}
                  ></Input>

                  <p data-cy="input-phone-label" className="text-sm pb-2">
                    Enter phone:
                    <span
                      data-cy="input-phone-error"
                      className="text-red-700 pl-2"
                    >
                      {errors.phone && touched.phone && errors.phone}
                    </span>
                  </p>
                  <Input
                    data-cy="input-phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter phone"
                    name="phone"
                    value={values.phone}
                  ></Input>
                  <CardFooter>
                    <Button data-cy="button-cancel" onClick={cancel}>
                      Cancel
                    </Button>
                    <Button
                      data-cy="button-submit"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </CardFooter>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
