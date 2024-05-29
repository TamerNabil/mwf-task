import { Selector, t } from 'testcafe';
import retry from 'async-retry';

/**
 * Page Object Model for the Salary Insight page.
 */
class SalaryInsightPage {

    /**
     * Initializes the selectors for the Salary Insight page elements.
     */
    constructor() {
        // Role, Country, and Search button
        this.roleDropdown = Selector('#mui-2');
        this.countryDropdown = Selector('#mui-4');
        this.roleListbox = Selector('#mui-2-listbox');
        this.countryListbox = Selector('#mui-4-listbox');
        this.submitButton = Selector('button').withText('Search');

        // Messages
        this.alertMessage = Selector('.MuiAlert-message');
        this.countryFieldAtt = Selector('div[data-qa="country-field"]');
        this.roleFieldAtt = Selector('div[data-qa="role-field"]');
        this.countryRequiredMessage = this.countryFieldAtt
            .parent('div')
            .find('p');
        this.roleFieldMessage = this.roleFieldAtt
            .parent('div')
            .find('p');

        // Salary Table
        this.dataTableHeader = Selector('div[data-qa=salary-table]').child('h2');
        this.salaryTable = Selector('div[data-qa="salary-table"]');
        this.salaryHighElement = this.salaryTable.find('div.recharts-customized-tick.right h4');
        this.filterBar = Selector('div[data-qa="filter-bar"]');
        this.seniorityButton = this.filterBar.find('h6').withText('Senior Level');

        // Seniority Dropdown
        this.juniorRadioButton = Selector('div[role="radiogroup"]').find('p').withText('Junior Level');

        // Unlock Modal
        this.firstNameInput = Selector('input[name="First-Name"]');
        this.lastNameInput = Selector('input[name="Last-Name"]');
        this.workEmailInput = Selector('input[name="Email"]');
        this.phoneNumberInput = Selector('input[name="Phone-Number"]');
        this.companyWebsiteInput = Selector('input[name="Company-Website"]');
        this.headquartersInput = Selector('input[name="country"]');
        this.companySizeInput = Selector('input[name="company-size"]');
        this.demoCheckbox = Selector('input[type="checkbox"]');
        this.unlockButton = Selector('button[type="submit"]').withText('Unlock');
    }

    /**
     * Searches for salary insights based on the provided role and country.
     * @param {string} role - The role to search for.
     * @param {string} country - The country to search for.
     */
    async search(role, country) {
        await t
            .click(this.roleDropdown)
            .typeText(this.roleDropdown, role);
        await this.clickFieldIfNotExpanded(this.roleFieldAtt, this.roleDropdown);

        let roleChosen = await this.roleListbox.withText(role);
        await t
            .click(roleChosen)
            .click(this.countryDropdown)
            .typeText(this.countryDropdown, country);
        await this.clickFieldIfNotExpanded(this.countryFieldAtt, this.countryDropdown);

        let countryChosen = await this.countryListbox.withText(country);
        await t
            .click(countryChosen)
            .click(this.submitButton);
    }

    /**
     * Clicks the field if it is not expanded.
     * @param {Selector} fieldSelector - The selector for the field.
     * @param {Selector} dropdownSelector - The selector for the dropdown.
     */
    async clickFieldIfNotExpanded(fieldSelector, dropdownSelector) {
        await retry(async () => {
            if (!(await fieldSelector.hasClass('Mui-expanded'))) {
                await t.click(dropdownSelector.sibling('div'));
            }
        }, { retries: 5 });
    }

    /**
     * Asserts that the header contains the specified message.
     * @param {string} message - The message to assert.
     */
    async assertHeaderContainsMessage(message) {
        await t.expect(this.dataTableHeader.innerText).contains(message);
    }

    /**
     * Asserts that the alert message contains the specified text.
     * @param {string} message - The message to assert.
     */
    async assertAlertMessage(message) {
        await t.expect(this.alertMessage.innerText).contains(message);
    }

    /**
     * Asserts that the required field error messages are displayed.
     */
    async assertRequiredFields() {
        await t
            .click(this.submitButton)
            .expect(this.roleFieldMessage.innerText).eql("Role is required")
            .expect(this.countryRequiredMessage.innerText).eql("Country is required");
    }

    /**
     * Asserts that the high salary value matches the specified amount.
     * @param {string} amount - The expected salary amount.
     */
    async assertHighSalary(amount) {
        const salaryHighText = await this.salaryHighElement.innerText;
        await t.expect(salaryHighText).eql(amount);
    }

    /**
     * Chooses the junior filter option.
     */
    async chooseJuniorFilter() {
        await t.click(this.seniorityButton);
        await t.click(this.juniorRadioButton);
    }

    /**
     * Asserts that the unlock modal is displayed.
     */
    async assertUnlockModalAppearance() {
        await t
            .expect(this.firstNameInput.exists).ok()
            .expect(this.lastNameInput.exists).ok()
            .expect(this.workEmailInput.exists).ok()
            .expect(this.phoneNumberInput.exists).ok()
            .expect(this.companyWebsiteInput.exists).ok()
            .expect(this.headquartersInput.exists).ok()
            .expect(this.companySizeInput.exists).ok()
            .expect(this.demoCheckbox.exists).ok()
            .expect(this.unlockButton.exists).ok();
    }
}

export default SalaryInsightPage;