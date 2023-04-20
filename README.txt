Assignment:
    "Qualification forms is the main way in which we get at the information needed to start the EK process.
 Please write an automation script to run the smoke tests cases, and let us know about any edge cases you 
 can think of."

***Accidentally forgot to update Node.js version before authoring scripts
   - Authored using Node v12.18.4 (retroactive nature of node.js shouldn't be an issue)
   
Features included:
 - Dynamic testing functions in cypress/integration/common/common_methods.ts.

 - "Background" in certain feature files to reduce run time.

 - Lables and fields (to ensure visibility).

 - Buttons (to ensure visibility, includes hrefs where applicable, and enabled/disabled validation).

 - Form input in Steps 1 and 2 (Assertions to verify fields are populating).

 - Field validation (Assertions that user may not proceed without all address fields populated).

    - Clear field: includes API intercepts/.wait('@apiName') to assert HTTP status code 200.

 - Assertions on Progress Bar component (verified values to UI are accurate).

 - Navigation from Steps 1, 2, 3, 4, 5:
    - Includes assertions that buttons are behaving as expected.
    - Clicking Continue directs the user to proper site accurate.
    - Includes assertions that unique header text per page is as expected.
    - Includes user's decision to learn more about EasyKnock.
    - Stubbed API calls on 'POST','api.segment.io/v1/p' and 'POST','api.segment.io/v1/t'.
    - Includes "back" via browser window to verify user can pick up where they left off.

Results:
 - practice-hello-world/Results

Videos:
 - practice-hello-world/cypress/videos

Observations: ***I noticed a lot of breaking changes on the night of 4/19
 - More data-testid attributes would reduce lines of code when locating elements and objects.

 - There are currently no component props that may be interpreted as IDs and exposed in the HTML.

 - Testing API status codes is difficut due to fast network calls (not a bad thing).
    - I suspect cypress.json variables' default timeouts are impacting this (cost-benefit?).

 - Lack of distinctive web elements containing:
    - Back and Continue button: clicking 'Back' was directing me forward in the user flow.
      - Hard to reproduce, but at times I saw a network call in DevTools for 'Back' (inconsistent).
    - may need to pass Query String Parameters when intercepting API.

 - Home page load times vary; (staging?) environment currently has stubbed API call.

Edge Cases:
 - Expected Results: Users may not manually input false addresses.
    - Actual Results: Currently no validation preventing the user from inputing false addresses.
        - 'Continue' button enables upon false address entry.
        - Discovered in manual testing; There are not currently requirements in place to assert in automation.

 - Expected Results: Field validation if a user enters unrealistic monetary values.
    - Actual Results: 
        - Estimated Case Needed + Mortgage Balance may exceed Estimated Home value
         by a large margin.
         - I am uncertain if exceeding Estimated Home Value is Acceptable Criteria.
          - If so, by how much?
          - May be an unnecessary burden on the data warehouse to store these records.

 - Expected Results: Users may not enter integer values or special characters in First/Last Name fields.
    - Actual Results: Users may either enter only special characters, only numbers, or a combination.
     - Discovered in manual testing; There are not currently requirements in place to assert in automation.

 - Expected Results: At least one combination of values submitted via form data would qualify the user.
    - Actual Results: the user was not able to qualify
        - Users could not qualify if:
            - They met requirements for "Sell & Stay".
            - They met requirements for "MovaAbility".

 - Expected Results: Home Page load times take no longer than 5 seconds (generally accepted).
   - Actual Results: Home Page load times take longer than 10 seconds at times, and flash different site areas.
      - Network calls need to be optimized?
      - **See last Scenario in navigation.feature.
      - Could be a result of a missing API intercept, and related Query String Parameters.
      - I had to stub the API call (without modifying) to decrease load times.
         - Decreases certainty of True-Positive (in terms of automation).


