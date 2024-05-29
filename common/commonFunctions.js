require('dotenv').config();
import { ClientFunction } from 'testcafe';

/**
 * Injects a network request monitoring script into the page.
 */
export const setupNetworkMonitoring = ClientFunction(() => {
    window.__activeRequestsCount = 0;

    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
        window.__activeRequestsCount++;
        this.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                window.__activeRequestsCount--;
            }
        });
        open.apply(this, arguments);
    };
});

/**
 * Gets the count of active network requests.
 * @returns {number} - The number of active network requests.
 */
export const getActiveRequestsCount = ClientFunction(() => {
    return window.__activeRequestsCount || 0;
});

/**
 * Waits for all network requests to complete before proceeding.
 * @param {TestController} t - The TestCafe test controller.
 */
export async function waitForAllRequestsToComplete(t) {
    await t.eval(() => {
        window.__activeRequestsCount = 0;

        const open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            window.__activeRequestsCount++;
            this.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    window.__activeRequestsCount--;
                }
            });
            open.apply(this, arguments);
        };
    });

    await t.expect(getActiveRequestsCount()).eql(0);
}
