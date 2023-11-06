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
        <Card className="w-100 h-150">
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
                  <p className="text-sm pb-2">
                    Enter name:
                    <span className="text-red-700 pl-2">
                      {errors.name && touched.name && errors.name}
                    </span>
                  </p>
                  <Input
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter name.."
                    name="name"
                    value={values.name}
                  />
                  <p className="text-sm pb-2">Enter avatar url:</p>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter avatar url"
                    name="avatar"
                    value={values.avatar}
                  ></Input>

                  <p className="text-sm pb-2">
                    Enter email:
                    <span className="text-red-700 pl-2">
                      {errors.email && touched.email && errors.email}
                    </span>
                  </p>
                  <Input
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter email"
                    name="email"
                    value={values.email}
                  />
                  <p className="text-sm pb-2">Enter dob:</p>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter dob"
                    name="birthday"
                    value={values.birthday}
                  ></Input>

                  <p className="text-sm pb-2">
                    Enter phone:
                    <span className="text-red-700 pl-2">
                      {errors.phone && touched.phone && errors.phone}
                    </span>
                  </p>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter phone"
                    name="phone"
                    value={values.phone}
                  ></Input>
                  <CardFooter>
                    <Button onClick={cancel}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting}>
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
