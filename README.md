# mwf-task

## Website: [https://growth-tools.deel.com/salary-insights](https://growth-tools.deel.com/salary-insights)

This website offers a tool providing insights into salaries for various positions in different countries. It's a valuable resource for assessing potential relocation opportunities that i use to give me some insights when someone want to relocte.



### Improvements To be Done

1. **Expand Test Coverage**: Enhanced test scenarios to cover various use cases.
2. **Integrate Allure Report**: Introduce Allure reporting for better test result visualization.
3. **CI/CD Integration**: Integrated the code with CI/CD pipelines for automated testing.
4. **API Validation**: Implemented API validations, especially for salary amounts.
5. **Cross-Browser Testing**: Ensure compatibility across different web browsers.
6. **Analytics Testing**: Included scenarios related to analytics in both unit and integration tests.
7. **Jira Integration**: Integrated with Jira for automated test execution and status updates.
8. **Enhance Documentation**: Enhance the documentation of code and readme file.


### Issues/Bugs Found in the Platform

1. **Unlock Feature Security Issue**: The table filters API are functional without requiring company data, contrary to the intended behavior on the UI.
   - **API Endpoint**: [https://api-prod.letsdeel.com/salary_insights?country=CA&currency=CAD&jobTitle=QA%20Engineer&scale=annually&seniorityLevel=3](https://api-prod.letsdeel.com/salary_insights?country=CA&currency=CAD&jobTitle=QA%20Engineer&scale=annually&seniorityLevel=3)
   
2. **Filter Behavior**: Filters are clickable and not functioning when no data is available, although they should be disabled or grayed out.


### Scenarios Implemented
1. Assert the high salary value insight when you choose role QA and Country Canada
2. Assert required field messages for role and country 
3. Assert message “There is not enough data to display yet.” If there are no data to show
4. Assert that filter usage will show the unlock model to fill first

### Framework Implementation Details

- **Testing Framework**: TestCafe for end-to-end testing scenarios.
- **Logging Library**: Used for easy logging of test execution details.
- **Screenshot and Video Recording**: Captured and stored in artifacts for test failures (adjustable for successful runs too).
- **HTML Report**: Detailed report of test execution results.
- **API Handling**: Ensured all APIs returned before UI executions.

### Notes

- **Environment Setup**: The `.env` file is included for convenience to make things easier for you, typically ignored in version control (`gitignore`) for security reasons.
- **Artifacts**: Uploaded for demonstration purposes; in practice, these would be excluded from version control (`gitignore`). Includes recorded videos, success reports, and logs from my test run.
- **Best Practice**: As best practice, should divide my code in multiple merges and pull requests and not to push directly into main branch ,i just did not follow this ,since this is only assesment.

### Scenarios to be implemented

1. **Unlock Feature Testing**: Validate each element on the dialog for functionality and validation and over all filters operations opening after unlock.
2. **Filter Accuracy**: Ensure filters in the salary table provide accurate results.
3. **UI vs. API Validation**: Verify data consistency between the UI and backend API responses.

### Running the Tests

1. Install Node.js.
2. Run `npm install` to install dependencies.
3. Execute `npm run test:e2e` to initiate the end-to-end tests.

### Technology Stack

- **Language**: JavaScript
- **Framework**: TestCafe
- **Design Pattern**: Page Object Model (POM)

================================================================================

## Salary Insights Test Cases

- **Verify Input Without Login:** Confirm users can input job title and country without requiring login.
- **Verify Required Fields:** Ensure users must input both job title and country for results to appear. Validate the display of a required message if fields are missing.
- **Verify Filter & Input Functionality:** Test users' ability to select,Clear and modify different filters (e.g., seniority, location).
- **Verify Handling of Invalid Input:** Evaluate how the tool handles and informs users about invalid inputs.
- **Verify Data Accuracy:** Ensure correct data is displayed based on input and applied filters. Validate the accuracy of salary insights and chart representations.
- **Verify Loading Indicators:** Confirm the display of loading indicators during data fetching.
- **Verify Unlocking :** Verify the validations of unlocking screen inputs and functionality after unlocking.


## Performance Test Cases

- **Verify Performance Under Load:** Assess tool performance with increasing numbers of concurrent users: 100, 1000, 10000, 100000,...users.

## Stress Testing

- **Verify Behavior Under Server Load:** Test the tool's behavior when server load exceeds normal capacity.
- **Verify Recovery Time:** Measure recovery time and system stability after stress conditions.

## Security Test Cases

- **Verify Input Security:** Ensure inputs are protected against SQL injection and XSS (Cross-Site Scripting) attacks.
- **Verify Filter Restrictions:** Ensure no filters can be used until the user enters required company data.
- **Verify Personal Data Security:** Ensure no personal data can be retreived in these insights.


## User Interface & Compatibility Test Cases

- **Verify Accessibility and Compatibility:** Confirm all elements are visible and accessible across different screen resolutions (desktop, tablet, smartphone).
- **Verify Cross-Browser Compatibility:** Test the tool's behavior on major browsers (Chrome, Firefox, Safari, Edge).
- **Verify Label Accuracy:** Check the correctness of labels and information displayed.

================================================================================

## Testing Strategy for Salary Insights Tool

### Objective

Ensure the Salary Insights tool functions accurately, reliably, and securely, providing valuable insights to users.

### Scope

- **Functional Testing**
- **Performance Testing**
- **Security Testing**
- **Usability Testing**
- **Compatibility Testing**
- **Regression Testing**

### Testing Types and Strategies

**Functional Testing**
- **Unit Testing:** Verify individual components such as data input fields, filters, and results display.
- **Integration / API Testing:** Ensure integrated modules (data retrieval and visualization) function correctly. Validate APIs for functionality and security.
- **System & E2E Testing:** Validate complete tool functionality and automation of end-to-end user scenarios.
- **Acceptance Testing:** Conducted by PM to confirm the tool meets business and user requirements.

**Performance Testing**
- **Load Testing:** Simulate multiple users accessing the tool simultaneously to assess performance under load.
- **Stress Testing:** Push the tool beyond operational limits to gauge resilience.
- **Scalability Testing:** Evaluate how well the tool scales with increasing user load.

**Security Testing**
- **Vulnerability Scanning:** Identify potential security vulnerabilities.
- **Penetration Testing:** Simulate cyber-attacks to identify and fix security weaknesses.
- **Data Protection Testing:** Ensure user private data protection and compliance with privacy regulations.

**Usability Testing**
- **User Interface Testing:** Assess user-friendliness, navigation, and design of the tool.

**Compatibility Testing**
- **Browser Compatibility Testing:** Verify functionality across different browsers (Chrome, Firefox, Safari, Edge).
- **Device Compatibility Testing:** Test across multiple devices (desktops, tablets, smartphones) to ensure responsiveness.

**Regression Testing**
- **Automated Regression Testing:** Continuously test existing functionality to prevent introduction of defects.
- **Manual Regression Testing:** Perform manual testing where automation is not feasible.

### Testing Tools

- **Functional Testing Tools:** Postman, TestCafe
- **Performance Testing Tools:** JMeter, LoadRunner
- **Security Testing Tools:** OWASP ZAP, Burp Suite, NetSparker
- **Compatibility Testing Tools:** LambdaTest
- **CI/CD Testing Tools:** Jenkins

### Test Environment

- **Development Environment:** Initial testing by developers.
- **Testing Environment:** QA/QC testing.
- **Staging Environment:** Replica of production environment for pre-release testing.
- **Production Environment:** Live environment for final deployment.

### Test Data Management

- Use realistic data to simulate actual user behavior.

### Defect Management

- Utilize Jira for defect tracking, logging, and managing defects with fix versions.
- Prioritize defects based on severity and impact.

### Reporting

- Generate comprehensive test reports summarizing activities, results, defects, and overall quality.
- Provide insights and recommendations for improvements.

### Continuous Improvement

- Regularly review and update testing strategy based on feedback.
- Integrate new tools and techniques to enhance the testing process.

================================================================================
