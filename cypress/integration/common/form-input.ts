import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
//import { selectorForTestId } from "../../support/common";
import { CommonMethods } from "./common_methods";

const common = new CommonMethods();

const address = "2940 Benton Pl Nw, Washington, DC 20008"
const accuracy = address.split(" ");
const streetNumber = accuracy[0];
const streetName = accuracy[1];
const streetType = accuracy[2]
const direction = accuracy[3].replace(/[,.]/g,"")
const city = accuracy[4].replace(/[,.]/g,"");
const zip = accuracy[6] + "-2718";

Then("{string} field contains {string} watermark", (field: string, watermark: string) => {
    common.watermarkText(`[data-testid=${field}]`, watermark);
});

When("the user types {string} in {string} field", (address: string, field: string) => {
    common.inputAddress(`[data-testid=${field}]`, address);
    cy.end();
});

When("the user types {string} into {string} field; its' value is {string}", 
    (fieldInput: string, testID: string, fieldValue: string ) => {
    common.nonAddressInput({
        fieldInput: fieldInput,
        testID: `[data-testid=${testID}]`,
        fieldValue: fieldValue,
    });
});

Then("the user selects the proper lookup result", () => {
    cy.get("[class='styles__Container-sc-14nh127-1 iCpUzH active']")
      .find("li:nth-first-child").click
});

Then("the user verifies Street Address field contains {string}", (parsedText: string) => {
    common.parsedText({
        testID: "[data-testid='streetAddress']", 
        parsedText: parsedText, 
        aspect:`${streetNumber} ${streetName} ${streetType} ${direction}`,
    });
});

Then("the user verifies City field contains {string}", (parsedText: string) => {
    common.parsedText({
        testID: "[data-testid='city']", 
        parsedText: parsedText, 
        aspect:`${city}`,
    });
});

Then("the user verifies Zip Code field contains {string}", (parsedText: string) => {
    common.parsedText({
        testID: "[data-testid='zipCode']", 
        parsedText: parsedText, 
        aspect:`${zip}`,
    });
});

Then("{string} field should be NULL", (testID: string) => {
    common.nullOnReset(testID);
});

Given("user types {string} into {string}", (fieldValue: string, testID: string, ) => {
    common.contactInfo({
        testID: testID,
        fieldValue: fieldValue,
    });
});