Feature: Tests to verify field validation triggers as expected
 
    Background: User populates all address fields
        Given the user navigates to practice website
        Then if prompted, user declines to accept cookies
        Then verify the Continue button is disabled - Step "1"
        When the user types "2940 Benton Place Northwest, Washington, DC 20008" in "streetAddress" field
        When verifying the Continue button is ENABLED - Step "1"

    #similar to address-form.feature except clearing each field given the scenario
    #field input is required to clear text and verify validation is triggered        

    Scenario: Trigger field validation - Street Address
        Then the user verifies Street Address field contains "2940 Benton Pl Nw"
        When the user clears text from the "streetAddress" field
        Then "streetAddress" field validation error message is triggered
        Then verify the Continue button is disabled - Step "1"

    Scenario: Trigger field validation - City
        Then the user verifies City field contains "Washington"
        When the user clears text from the "city" field 
        Then "city" field validation error message is triggered
        Then verify the Continue button is disabled - Step "1"

    #State dropdown does not possess a data-testid
    #State dropdown cannot be nullified once populated

    Scenario: Trigger field validation - Zip Code
        Then the user verifies Zip Code field contains "20008-2718"
        When the user clears text from the "zipCode" field 
        Then "zipCode" field validation error message is triggered
        Then verify the Continue button is disabled - Step "1"


