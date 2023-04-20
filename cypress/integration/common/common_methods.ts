//Imports for custom selectors and TestID file paths would go here
//import { selectorForTestId } from "../../support/common";
//import { practiceTestIDs } from "../../../src/common/test-ids";

//I personally like to destructure TestIDs in case I need some from different enum groups
// const testids = {
//     ...practiceTestIDs,
//     //destructure IDs for indexing purposes
// }

export class CommonMethods {
    //dynamic functions to save lines of code

  progressBar(value: string){
    cy.get("[id='root']").find('div')
     .find("[class='sc-ktEKTO jnAxKO']")
     .find("[class='MuiGrid-root MuiGrid-container css-1cn3yto']")
     .find("[class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-3 css-tpwxgj']")
     .find('div')
     .should('have.attr','aria-valuenow')
     .and('eq',value);
  }

  watermarkText(testID: string, watermark: string) {
    cy.get("[id='root']")
      .find("[class='styles__Form-sc-18arsap-0 gMntps']")
      .find(testID)
      .find('span').should('have.text',watermark);
  }

  inputAddress(testID: string, address: string) {
    cy.intercept('POST','api.segment.io/v1/t').as('segmentT');
    cy.get("[data-testid='Address Form']")
      .find(testID)
      .find('input').type(address).wait(500);
    cy.intercept('POST','addressvalidation.googleapis.com/')
    cy.intercept('GET','maps.googleapis.com/maps/api/place/js/')
    cy.get("[class='styles__Placer-sc-14nh127-0 ciNJZg']")
      .find("[class='styles__Container-sc-14nh127-1 iCpUzH active']",{ timeout: 5_000})
      .find('button')
      .should('have.text',`${address}, USA`).click()
    cy.intercept('POST','api.segment.io/v1/t').as('segmentT');
  }

  nullOnReset(testID: string) {
    cy.get("[id='root']")
      .find("[step='1']")
      .find("[data-testid='Address Form']")
      .find(`[data-testid=${testID}]`)
      .find('input')
      .should('have.attr','value')
        .and('eq','');
  }

  nonAddressInput({
    testID,
    fieldInput,
    fieldValue,
  }:{testID: string, 
    fieldInput: string, 
    fieldValue: string}){
    cy.get("[step='2']")
      .find("[class='styles__Form-sc-18arsap-0 gMntps']")
      .find("[class='styles__Main-sc-18arsap-2 gpJRcR']")
      .find("[class='MuiGrid-root MuiGrid-container css-1cn3yto']")
      .find("[class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 css-1krs05m']")
      .find("[class='styles__Fieldset-sc-1otdedw-0 kBQFKP']")
      .find("[class='MuiFormControl-root MuiFormControl-fullWidth styles__FormControl-sc-iixuho-0 kpngVB css-tzsjye']")
      .find(testID)
      .find('input').type(fieldInput)
      .should('have.attr','value').and('eq', fieldValue);
  }

  contactInfo({
    testID,
    fieldValue,
  }:{
    testID?: string,
    fieldValue?: string
  }) {
  //more data-testids and/or custom props would make this more readable
    cy.get("[id='root']").find("[step='5']")
      .find("[class='styles__Form-sc-18arsap-0 gMntps']")
      .find("[class='styles__Main-sc-18arsap-2 gpJRcR']")
      .find("[class='MuiGrid-root MuiGrid-container css-1cn3yto']")
      .find("[class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 css-1krs05m']")
      .find("[class='styles__Fieldset-sc-1otdedw-0 kBQFKP']")
      .find("[class='MuiFormControl-root MuiFormControl-fullWidth styles__FormControl-sc-iixuho-0 kpngVB css-tzsjye']")
      .find(`[data-testid=${testID}]`).type(fieldValue).wait(100)
      .find('input').should('have.attr','value').and('eq',fieldValue);
  }

  parsedText({
    testID, 
    parsedText, 
    aspect,
    }:{
    testID: string, 
    parsedText: string, 
    aspect: string}) {

    parsedText = aspect;

    cy.get("[data-testid='Address Form']")
      .find(testID)
      .find('input')
      .should('have.attr','value')
      .and('eq',parsedText);       
  }

  nonStepOneHeaderText(stepNumber: string, expectedText: string){

    cy.get("[id='root']")
    cy.get(`[step=${stepNumber}]`)
      .find("[class='styles__Form-sc-18arsap-0 gMntps']")
      .find("[class='styles__Header-sc-18arsap-1 cyEcag']")
      .find("[class='MuiGrid-root MuiGrid-container css-1cn3yto']")
      .find("[class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-9 MuiGrid-grid-md-8 css-pieaab']")
      .find('h2')
      .should('have.text',expectedText)
  }

  clearField({
    testID, 
  }:{
    testID: string,
  }){
    cy.intercept('POST','https://api.segment.io/v1/t').as('clearFetch');
    cy.get("[class='styles__Form-sc-18arsap-0 gMntps']")
      .find(testID)
      .find('input')
      .clear()
      .wait('@clearFetch').its('response.statusCode').should('eq',200).then(() => {

        cy.get("[data-testid='Address Form']")
        .find(testID)
        .find('input')
        .should('have.attr','value')
        .and('eq','');
      });

  }

  fieldValidation(locator: string, testID: string){
    cy.wait(200);
    cy.get(locator)
      .find(testID)
      .find("[class='MuiInputAdornment-root MuiInputAdornment-positionEnd MuiInputAdornment-outlined MuiInputAdornment-sizeMedium css-1nvf7g0']")
      .find('figure')
      .should('have.attr','aria-label')
      .and('eq','Error');
    //Error message text is not exposed in the HTML
    //Error messages do not have unique testing IDs
    //aria-label is only available if validation message is visible 
  }

  continueDisabled(stepNumber: string){
    //If statements to convey how useful unique testing IDs are
    cy.get("[id='root']").find('div').get(`[step=${stepNumber}]`).then($element => {
      if($element.attr('step') === '1'){
        cy.get("[data-testid='Address Form']")
          .find("[class='styles__Fieldset-sc-1otdedw-0 sc-hAtEyd dobLVP hNpbBw']")
          .find('button')
          .should('have.attr','disabled');
      }
      else if($element.attr('step') !== '1'){
      cy.get("[class='styles__Form-sc-18arsap-0 gMntps']")
          .find("[class='styles__Fieldset-sc-1otdedw-0 sc-hAtEyd dobLVP hNpbBw']")
          .children('button')
          .then($unique => {
            if($unique.attr('type') === 'submit'){
              expect($unique).to.have.attr('disabled');
            }
          });
      }
    });
  }

  continueEnabled(stepNumber: string){
    cy.get("[id='root']").find(`[step=${stepNumber}]`).then($element => {
      if($element.attr('step') === '1'){
        cy.get("[data-testid='Address Form']")
          .find("[class='styles__Fieldset-sc-1otdedw-0 sc-hAtEyd dobLVP hNpbBw']")
          .find('button')
          .should('not.have.attr','disabled');
      }
      else if($element.attr('step') !== '1'){
        cy.get("[class='styles__Fieldset-sc-1otdedw-0 sc-hAtEyd dobLVP hNpbBw']")
          .children('button')
          .then($unique => {
            if($unique.attr('type') === 'submit'){
              expect($unique).to.not.have.attr('disabled');
            }
          });
      }
    });

  }

 clickContinue(stepNumber: string){
  cy.get("[id='root']")
    .find(`[step=${stepNumber}]`)
    .find("[class='styles__Fieldset-sc-1otdedw-0 sc-hAtEyd dobLVP hNpbBw']")
    .find("[class='styles__Button-sc-uejjt6-0 fuEVRJ sc-fLQRDB hRHDpe']")
    .click()
cy.intercept('POST','api.segment.io/v1/p').as('segmentP');
cy.intercept('POST','api.segment.io/v1/t').as('segmentT');
 }

  previousStep(){
    //I'd need to investigate to determine if Query String Parameters are required..
    //when intercepting API. Currently clicking 'Back' moves to the next step
    cy.wait(250);
      cy.get("[class='styles__Form-sc-18arsap-0 gMntps']")
        .find("[class='styles__Form-sc-18arsap-0 gMntps']")
        .find("[class='styles__Fieldset-sc-1otdedw-0 sc-hAtEyd dobLVP hNpbBw']")
        .children('div')
        .find("[class='styles__Header5-sc-fdf9gb-20 sc-fGFwAa gHWFGY dkGsnt']")
        .then($button => {
          if($button.text() === "Back"){
            cy.get("[class='styles__Header5-sc-fdf9gb-20 sc-fGFwAa gHWFGY dkGsnt']")
              .trigger('mouseover')
              .click({force:true});
          }
        });
  }

  step4YesNo(testID: string){
    cy.get("[step='3']")
      .find("[class='styles__Form-sc-18arsap-0 gMntps']")
      .find("[class='MuiGrid-root MuiGrid-container css-1cn3yto']")
      .find("[class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12 css-1hwcsyq']")
      .find("[class='sc-hIqOWS bCVbBo']")
      .find("[class='sc-dKfzgJ govmEB']")
      .find(`[data-testid=${testID}]`)
      .click();
  }
}