require('dotenv').config();
import SalaryInsightPage from "../models/Pages/salaryInsightPage";
import { log } from '../../common/lib/base';
import * as functions from '../../common/commonFunctions';

const salaryInsight = new SalaryInsightPage();

fixture`Salary Insight Tests`
    .page`${process.env.URL}`
    .beforeEach(async t => {
        log.info("---- Start Test -------");
        await functions.waitForAllRequestsToComplete(t);
    })
    .afterEach(async t => {
        log.info("---- End Test -------");
    });

test.meta('ID', '123')('Assert The High Salary Value Insight by Role QA Engineer and Country Canada', async t => {
    const role = "QA Engineer";
    const country = "Canada";

    log.info("Choosing Role and Country");
    await salaryInsight.search(role, country);

    log.info("Assert Chosen Role and Country in Header");
    await salaryInsight.assertHeaderContainsMessage(role);
    await salaryInsight.assertHeaderContainsMessage(country);

    log.info("Assert High Salary"); // will be enhanced later by Adding the API call and assert value matches UI
    await salaryInsight.assertHighSalary('C$181K');
});

test.meta('ID', '124')('Assert Required Field', async t => {
    log.info("Assert Not Choosing Required fields will get Error Message");
    await salaryInsight.assertRequiredFields();
});

test.meta('ID', '125')('Assert No Data by Role Test Analyst and Country Singapore', async t => {
    const role = "Test Analyst";
    const country = "Singapore";

    log.info("Choosing Role and Country");
    await salaryInsight.search(role, country);

    log.info("Assert Alert Message");
    await salaryInsight.assertAlertMessage("There is not enough data to display yet.");
});

test.meta('ID', '126')('Assert Unlock Model', async t => {
    const role = "Accountant";
    const country = "Argentina";

    log.info("Choosing Role and Country");
    await salaryInsight.search(role, country);

    log.info("Assert Chosen Role and Country in Header");
    await salaryInsight.assertHeaderContainsMessage(role);
    await salaryInsight.assertHeaderContainsMessage(country);

    log.info("Try to change the filters");
    await salaryInsight.chooseJuniorFilter();

    log.info("Assert Unlock Model");
    await salaryInsight.assertUnlockModalAppearance();
});
