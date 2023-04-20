import { And, Given, When, Then } from "cypress-cucumber-preprocessor/steps";
//import { selectorForTestId } from "../../support/common";
import { CommonMethods } from "./common_methods";

const common = new CommonMethods();

When("the user clears text from the {string} field", (testID: string) => {
    common.clearField({
        testID: `[data-testid='${testID}']`,
    });
});

Then("{string} field validation error message is triggered", (testID: string, locator: string) => {
    common.fieldValidation("[class='styles__Form-sc-18arsap-0 gMntps']", `[data-testid='${testID}']`);
});

Then("verify the Continue button is disabled - Step {string}", (stepNumber: string) => {
    common.continueDisabled(stepNumber);
});

When("verifying the Continue button is ENABLED - Step {string}", (stepNumber: string) => {
    common.continueEnabled(stepNumber);
});

// Then("verify the Continue button @ {string} is disabled", (formLocator: string) => {
//   common.continueDisabled()
// });