import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
//import { selectorForTestId } from "../../support/common";
import { CommonMethods } from "./common_methods";
//import { practiceTestIDs } from "../../../src/common/test-ids";

//destructure test ids for dynamic flexibility with functions
//mainly for if test IDs are imported from different locations
// const testids = {
//     ...practiceTestIDs,
// }

const common = new CommonMethods();

before(() => {
    cy.intercept('POST','www.google-analytics.com/j/').as('ga');
    cy.intercept('GET','tk.leadlabs.tv/tr/properties/index.php?id=ID-52251039').as('leadlabs');
    cy.intercept('GET','ct.pinterest.com/user/').as('pinterest');
    cy.intercept('GET','forms.hscollectedforms.net/collected-forms/v1/config/').as('forms');
    cy.intercept('POST','api.segment.io/v1/p').as('segmentP');
    cy.intercept('POST','api.segment.io/v1/t').as('segmentT');
    cy.intercept('GET','maps.googleapis.com/maps/api/mapsjs/').as('googleMaps');
});
  
beforeEach(() => {

});

// after(() => {
//   cy.end();
// can be used for stubbing/spying on API calls
// });

//default timeout variables and values are in cypress.json
Given("the user navigates to practice website", () => {
    const p = cy.stub().as('p')
    const t = cy.stub().as('t')
    cy.visit('https://secure-stg.easyknock.com/getoffer')
    cy.on('window:before:load', (win) => {
        Object.defineProperty(win, 'p', {
          configurable: false,
          get: () => p, // always return the stub
          set: () => {}, // don't allow actual 'p' to overwrite this property
        });
        Object.defineProperty(win, 't', {
          configurable: false,
          get: () => t, // always return the stub
          set: () => {}, // don't allow actual 't' to overwrite this property
        });
      });
      cy.on('window:unload', () => {
        expect(window).to.not.be.null
      });
});

Given("the user vists the URL for Step 5", () => {
    const p = cy.stub().as('p')
    const t = cy.stub().as('t')
    cy.visit('https://secure-stg.easyknock.com/getoffer?step=5')
    cy.on('window:before:load', (win) => {
        Object.defineProperty(win, 'p', {
          configurable: false,
          get: () => p, // always return the stub
          set: () => {}, // don't allow actual 'p' to overwrite this property
        });
        Object.defineProperty(win, 't', {
          configurable: false,
          get: () => t, // always return the stub
          set: () => {}, // don't allow actual 't' to overwrite this property
        });
      });
      cy.on('window:unload', () => {
        expect(window).to.not.be.null
      });
})

When("Welcome Header text is verified", () => {
    //ensures no missing label keys if text is not static in source code
    cy.get("[data-testid='Address Form']")
      .find("[id='WelcomeHeader']")
      .should('have.text',"Welcome to EasyKnock!");
});

When("Header text: Step {string} - {string}", (stepNumber: string, expectedText: string) => {
    common.nonStepOneHeaderText(stepNumber,expectedText);
});

Then("the progress bar indicates {string} per cent complete", (value: string) => {
    common.progressBar(value);
});







