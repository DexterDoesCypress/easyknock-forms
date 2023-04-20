Feature: Tests to see if your home qualifies

    Scenario: User visits EasyKnock webpage
        Given the user navigates to practice website
        Then if prompted, user declines to accept cookies
        Then verify the Continue button is disabled - Step "1"

    Scenario: User types Address and selects typeahead result
        When the user types "2940 Benton Place Northwest, Washington, DC 20008" in "streetAddress" field

    Scenario: Verify Google autofill for Street Address
        Then the user verifies Street Address field contains "2940 Benton Pl Nw"

    Scenario: Verify Google autofill for City
        Then the user verifies City field contains "Washington"

    Scenario: Verify Google autofill for Zip Code
        Then the user verifies Zip Code field contains "20008-2718"

    Scenario: "Continue" button is enabled when validation is met
        Then the progress bar indicates '16.666666666666668' per cent complete
        Then verify the Continue button is ENABLED

    # Reset button disappears on 4/19
    # Scenario: User clicks the Reset button
    #     When the reset button is clicked
    #     Then "streetAddress" field contains "Street Address" watermark
    #     Then "city" field contains "City" watermark
    #     Then "zipCode" field contains "Zip Code" watermark

    # Scenario: Address fields' value is NULL upon reset
    #     Then "streetAddress" field should be NULL
    #     Then "city" field should be NULL
    #      Then "zipCode" field should be NULL       
