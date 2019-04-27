'use strict'

const util = require('util')
const { GoogleAdsClient, SearchGoogleAdsRequest, PolicyApprovalStatusEnum } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID } = require('../utils/argument_names')

const PAGE_SIZE = 1000

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 */
async function runExample (googleAdsClient, customerId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)
  request.setQuery(`
    SELECT
      account_budget.status,
      account_budget.billing_setup,
      account_budget.approved_spending_limit_micros,
      account_budget.approved_spending_limit_type,
      account_budget.proposed_spending_limit_micros,
      account_budget.proposed_spending_limit_type,
      account_budget.approved_start_date_time,
      account_budget.proposed_start_date_time,
      account_budget.approved_end_date_time,
      account_budget.approved_end_time_type,
      account_budget.proposed_end_date_time,
      account_budget.proposed_end_time_type
    FROM account_budget
  `)
  request.setPageSize(PAGE_SIZE)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    const accountBudget = row.getAccountBudget()

    console.log(
      `Found the account budget '%s' with status '%d', billing setup `
      + `'%s', amount served %d, total adjustments %d,`
      + `  approved spending limit '%s' (proposed '%s'),`
      + `  approved start time '%s' (proposed '%s'),`
      + `  approved end time '%s' (proposed '%s').\n`,
      accountBudget.getResourceName(),
      accountBudget.getStatus(),
      accountBudget.getBillingSetup()
        ? accountBudget.getBillingSetup().getValue()
        : 'none',
      accountBudget.getAmountServedMicros()
        ? accountBudget.getAmountServedMicros().getValue() / 1000000.0
        : 0.0,
      accountBudget.getTotalAdjustmentsMicros()
        ? accountBudget.getTotalAdjustmentsMicros().getValue() / 1000000.0
        : 0.0,
      accountBudget.getApprovedSpendingLimitMicros()
        ? util.format('%d', accountBudget.getApprovedSpendingLimitMicros().getValue() / 1000000.0)
        : accountBudget.getApprovedSpendingLimitType(),
      accountBudget.getProposedSpendingLimitMicros()
        ? util.format('%d', accountBudget.getProposedSpendingLimitMicros().getValue() / 1000000.0)
        : accountBudget.getProposedSpendingLimitType(),
      accountBudget.getApprovedStartDateTime()
        ? accountBudget.getApprovedStartDateTime().getValue()
        : 'none',
      accountBudget.getProposedStartDateTime()
        ? accountBudget.getProposedStartDateTime().getValue()
        : 'none',
      accountBudget.getApprovedEndDateTime()
        ? accountBudget.getApprovedEndDateTime().getValue()
        : accountBudget.getApprovedEndTimeType(),
      accountBudget.getProposedEndDateTime()
        ? accountBudget.getProposedEndDateTime().getValue()
        : accountBudget.getProposedEndTimeType(),
    )
  }
}

main().catch(console.error)
