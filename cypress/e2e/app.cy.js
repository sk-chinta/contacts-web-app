describe("Contacts web app - ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("test to create a new contact record", () => {
    cy.get("[data-cy=add-contact]").should("have.text", "Add Contact");
    cy.get("[data-cy=add-contact]").click();

    cy.get("[data-cy=input-name-label]").should("have.text", "Enter name:");
    cy.get("[data-cy=input-name]").focus();
    cy.get("[data-cy=input-avatar]").focus();
    cy.get("[data-cy=input-name-error]").should("have.text", "Required");
    cy.get("[data-cy=input-name]").focus().type("Santosh Kumar");

    cy.get("[data-cy=input-avatar-label]").should(
      "have.text",
      "Enter avatar url:"
    );
    cy.get("[data-cy=input-avatar]").focus().type("https://i.pravatar.cc/320");

    cy.get("[data-cy=input-email-label]").should("have.text", "Enter email:");
    cy.get("[data-cy=input-email]").focus();
    cy.get("[data-cy=input-avatar]").focus();
    cy.get("[data-cy=input-email-error]").should("have.text", "Required");
    cy.get("[data-cy=input-email]").focus().type("test@gmail.com");

    cy.get("[data-cy=input-dob-label]").should("have.text", "Enter dob:");
    cy.get("[data-cy=input-dob]").focus().type("1999-12-23");

    cy.get("[data-cy=input-phone-label]").should("have.text", "Enter phone:");
    cy.get("[data-cy=input-phone]").focus().type("+44 1111111111");

    cy.get("[data-cy=button-submit]").should("have.text", "Submit");

    cy.intercept("POST", "**/contacts").as("contacts");
    cy.get("[data-cy=button-submit]").click();

    cy.wait("@contacts")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);

    cy.get("[data-cy=add-contact]").should("have.text", "Add Contact");
  });

  it("test to list all contacts and check if the Edit and Remove Button Exist", () => {
    cy.intercept("GET", "**/contacts").as("getContacts");
    cy.wait("@getContacts")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);
    cy.get("[data-cy=contact-card]").eq(0).click();

    cy.get("[data-cy=remove-contact-button]").eq(0).should("exist");
    cy.get("[data-cy=edit-contact-button]").eq(0).should("exist");
  });

  it("test to remove a contact", () => {
    cy.intercept("GET", "**/contacts").as("getContacts");
    cy.wait("@getContacts")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);

    cy.get("[data-cy=contact-card]").eq(0).click();
    cy.get("[data-cy=remove-contact-button]").eq(0).should("exist");

    cy.intercept("DELETE", "**/contacts/**").as("deleteContact");
    cy.get("[data-cy=remove-contact-button]").eq(0).click();
    cy.wait("@deleteContact")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);
  });

  it.only("test to update a contact record", () => {
    cy.intercept("GET", "**/contacts").as("getContacts");
    cy.wait("@getContacts")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);

    cy.get("[data-cy=contact-card]").eq(0).click();
    cy.get("[data-cy=edit-contact-button]").eq(0).should("exist");
    cy.get("[data-cy=edit-contact-button]").eq(0).click();

    cy.get("[data-cy=input-name-label]").should("have.text", "Enter name:");
    cy.get("[data-cy=input-name]").focus().type("Santosh Kumar");

    cy.get("[data-cy=button-submit]").should("have.text", "Submit");

    cy.intercept("PUT", "**/contacts/**").as("updateContacts");
    cy.get("[data-cy=button-submit]").click();

    cy.wait("@updateContacts")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);

    cy.get("[data-cy=add-contact]").should("have.text", "Add Contact");
  });
});
