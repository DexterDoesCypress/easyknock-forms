import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
//import { selectorForTestId } from "../../support/common";
import { CommonMethods } from "./common_methods";

const common = new CommonMethods();

Then("easyknock button contains href link", () => {
    cy.get("[class='styles__Bar-sc-1c12up8-0 fFVQoV']")
      .find("[id='nav-bar-inner-container']",{ timeout: 3_000})
      .find('a').should('have.attr','href')
      //data-testid attribute in the 'a' element would
      //make it easier to verify the href's value
});

Then("the user clicks the EasyKnock button", () =>{
  const p = cy.stub().as('p')
  const t = cy.stub().as('t')
  cy.intercept('POST','api.segment.io/v1/p').as('segmentP');
  cy.intercept('POST','api.segment.io/v1/t').as('segmentT');
  cy.get("[class='styles__Bar-sc-1c12up8-0 fFVQoV']")
    .find("[id='nav-bar-inner-container']",{ timeout: 3_000}) 
    .find('a') 
    .click()

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

Then("I verify the reset button is enabled", () => {
    cy.get("[class='styles__Bar-sc-1c12up8-0 fFVQoV']")
      .find("[id='nav-bar-inner-container']",{ timeout: 3_000}) 
      .find('button').then($button => {
        expect($button).to.be.enabled;
      });
});

When("the reset button is clicked", () => {
  cy.intercept('POST','https://api.segment.io/v1/t').as('clearFetch');
    cy.get("[class='styles__Bar-sc-1c12up8-0 fFVQoV']")
      .find("[id='nav-bar-inner-container']",{ timeout: 3_000}) 
      .find('button').find("[data-testid='resetbtnqf']")
      .click()
      //.wait('@clearFetch').its('response.statusCode').should('eq',200)
      .get("[id='__next']",{ timeout: 5_000}).should('not.be.null')
});

Then("if prompted, user declines to accept cookies", () => {
    //Privacy Content modal needs a data-testid or custom prop added
    //explicit use of selectors helped prevent test flake
    //needed to use CSS selectors since testing IDs were not available
    //class names are prone to change over time, so more IDs would be ideal
    cy.get("[class='styles__Container-sc-m01fi4-0 XWqtv']").then(($section) => {
        if($section.html().includes('header')){
            cy.get("[class='styles__Container-sc-m01fi4-0 XWqtv']")
              .get("[class='styles__Header-sc-m01fi4-3 htOIUy']")
              .find("[class='styles__Header4-sc-fdf9gb-19 ggobPS']")
              .should('have.text',"Privacy Consent").then(() => {
                cy.get("[class='styles__Header-sc-m01fi4-3 htOIUy']")
                  .find("[class='styles__Button-sc-1apv7dp-0 fiZmAp styles__CloseButton-sc-m01fi4-2 eFiDVX']")
                  .click();
                });

        } else {
            cy.log("Privacy Content modal not present");
            cy.end();
        }
    });
});

When("user express intent to move by clicking {string}", (testID: string) => {
  common.step4YesNo(testID);
});

Then("verify the Continue button is ENABLED", () => {
    cy.get("[data-testid='Address Form']")
        .find("[class='styles__Fieldset-sc-1otdedw-0 sc-hAtEyd dobLVP hNpbBw']")
        .find('button')
        .should('not.have.attr','disabled');
});

When("the Continue button is clicked in Step {string}", (stepNumber: string) => {
  common.clickContinue(stepNumber)
});

Then("the user specifies Home Type as Single Family", () => {
  cy.get("[step='2']")
    .find("[class='styles__Form-sc-18arsap-0 gMntps']")
    .find("[class='styles__Main-sc-18arsap-2 gpJRcR']")
    .find("[class='MuiGrid-root MuiGrid-container css-1cn3yto']")
    .find("[class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 css-1krs05m']")
    .find("[class='styles__Fieldset-sc-1otdedw-0 kBQFKP']")
    .find("[role='select']").click().then(() => {
        cy.get("[role='select']")
          .find("[class='styles__Container-sc-14nh127-1 jmvkOu active']")
          .find("[role='listbox']")
          .find('li:nth-child(1)')
          .click();
    });
});

//Issues with API: clicking "Back" directs the user to the next step
//Test reflects a False-Negative result
Then("the user goes back to Step 1", () => {
    common.previousStep();
});

//Browser navigation "back" to ensure Address form data is persisted
Given("the user clicks the Back arrow in Chromium window", () => {
  cy.go('back',{ timeout: 5_000});
});