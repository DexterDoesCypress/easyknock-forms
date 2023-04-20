Feature: Required elements and objects

    Background: User visits EasyKnock webpage
        Given the user navigates to practice website
        Then if prompted, user declines to accept cookies
        Then verify the Continue button is disabled - Step "1"
        
    #breaking out simple tests into different scenarios allows
    #for defects to be isolated without inhibiting other assertions
    Scenario: Verify Header buttons and text
        Then easyknock button contains href link
        When Welcome Header text is verified
        Then the progress bar indicates '16.666666666666668' per cent complete

    Scenario: Verify "Street Address" watermark/label exists
        Then "streetAddress" field contains "Street Address" watermark

    Scenario: Verify "City" watermark/label exists
        Then "city" field contains "City" watermark

    #data-testid for "State" field is missing

    Scenario: Verify "Zip Code" watermark/label exists
        Then "zipCode" field contains "Zip Code" watermark