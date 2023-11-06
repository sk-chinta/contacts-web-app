import { Button } from "@/components/button";

describe("Button.cy.tsx", () => {
  it("uses custom text for the button label", () => {
    cy.mount(<Button>Save</Button>);
    cy.get("button").should("contains.text", "Save");
  });
});
