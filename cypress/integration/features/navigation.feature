Feature: Tests to ensure successful user flow

    Scenario: User completes Step 1 to see if they qualify
        Given the user navigates to practice website
        Then if prompted, user declines to accept cookies
        Then easyknock button contains href link
        Then verify the Continue button is disabled - Step "1"
        When the user types "2940 Benton Place Northwest, Washington, DC 20008" in "streetAddress" field
        When verifying the Continue button is ENABLED - Step "1"
        When the Continue button is clicked in Step "1"
 
    
    Scenario: User proceeds to Step 2

        Then the progress bar indicates '33.333333333333336' per cent complete
        When Header text: Step "2" - "Tell us a bit about your home"
        Then verify the Continue button is disabled - Step "2"

    Scenario: User navigates "Back" to double check Address fields
        Given the user clicks the Back arrow in Chromium window

    Scenario: Address form fields persist proper values
        Then the progress bar indicates '16.666666666666668' per cent complete
        Then the user verifies Street Address field contains "2940 Benton Pl Nw"
        Then the user verifies City field contains "Washington"
        Then the user verifies Zip Code field contains "20008-2718"
        When verifying the Continue button is ENABLED - Step "1"
        When the Continue button is clicked in Step "1"

    Scenario: User returns to Step 2
        Then easyknock button contains href link
        # Then I verify the reset button is enabled
        Then the progress bar indicates '33.333333333333336' per cent complete
        When Header text: Step "2" - "Tell us a bit about your home"
        Then verify the Continue button is disabled - Step "2"

    Scenario: Verify Step 2 watermarks/labels are accurate
        Then "estimatedHomeValue" field contains "Estimated Home Value" watermark
        Then "mortgageBalance" field contains "Mortgage Balance" watermark
        Then "estimatedCashNeeded" field contains "Estimated Cash Needed" watermark

    Scenario: User populates "Estimated Home Value" field
        When the user types "700000" into "estimatedHomeValue" field; its' value is "700,000"

    Scenario: User populates "Mortgage Balance" field
        When the user types "560000" into "mortgageBalance" field; its' value is "560,000"

    Scenario: User populates "Estimated Cash Needed" field
        When the user types "100000" into "estimatedCashNeeded" field; its' value is "100,000"

    Scenario: User forgets to complete first field
        Then verify the Continue button is disabled - Step "2"

    Scenario: User selects their home type
        Then the user specifies Home Type as Single Family

    Scenario: User proceeds to Step 3
        When verifying the Continue button is ENABLED - Step "2"
        When the Continue button is clicked in Step "2"

    Scenario: User is on Step 3
        When Header text: Step "3" - "Are you planning to move in the next 12 months?"
        Then easyknock button contains href link
        Then the progress bar indicates '50' per cent complete

    Scenario: User indicates whether or not they plan to move
        When user express intent to move by clicking "moveIntentionNo"

    Scenario: User is directed to Step 5 after clicking "No"
        Then the progress bar indicates '83.33333333333333' per cent complete
        When Header text: Step "5" - "Tell us about yourself"
        Then verify the Continue button is disabled - Step "5"

#DEFECT: homepage takes double the expected amount of time to load
# Root Cause: may be missing query string parameters
    Scenario: Click EasyKnock button to learn more
        Then the user clicks the EasyKnock button

    Scenario: User learns more then returns to 'Get Qualified'
        Given the user clicks the Back arrow in Chromium window

    Scenario: User confirms they are still on Step 5 
        Then the progress bar indicates '83.33333333333333' per cent complete
        When Header text: Step "5" - "Tell us about yourself"

    Scenario: Step 5 - user adds contact information
        Given user types "!!!!!!!!" into "firstName"
        Given user types "????????" into "lastName"
        Given user types "$$$$$@^^.com" into "email"

    Scenario: First Name field validation is triggered
        Then "firstName" field validation error message is triggered

    Scenario: Last Name field validation is triggered
        Then "lastName" field validation error message is triggered

    Scenario: Email Address field validation is triggered
        Then "email" field validation error message is triggered

