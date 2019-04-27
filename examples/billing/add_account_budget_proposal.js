'use strict'

const {
  GoogleAdsClient,
  AccountBudgetProposal,
  AccountBudgetProposalTypeEnum,
  TimeTypeEnum,
  AccountBudgetProposalOperation,
  MutateAccountBudgetProposalRequest
 } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, BILLING_SETUP_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, BILLING_SETUP_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const billingSetupId = options.billingSetupId || 'INSERT_BILLING_SETUP_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, billingSetupId)
}

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} billingSetupId - The billing setup ID used to add the account budget proposal.
 */
async function runExample (googleAdsClient, customerId, billingSetupId) {
  const accountBudgetProposal = {
    billing_setup: `customers/${customerId}/billingSetups/${billingSetupId}`,
    proposal_type: AccountBudgetProposalTypeEnum.AccountBudgetProposalType.CREATE,
    proposed_name: 'Account Budget (example)',
    proposed_start_time_type: TimeTypeEnum.TimeType.NOW,
    // proposed_start_date_time: '2020-01-02 03:04:05',
    proposed_end_time_type: TimeTypeEnum.TimeType.FOREVER,
    // proposed_end_date_time: '2021-02-03 04:05:06',
    // proposed_notes: 'Received prepayment of $0.01',
    // proposed_purchase_order_number: 'PO number 12345',
    proposed_spending_limit_micros: 10000
  }
  
  const accountBudgetProposalOperation = new AccountBudgetProposalOperation()
  accountBudgetProposalOperation.setCreate(googleAdsClient.buildResource('AccountBudgetProposal', accountBudgetProposal))

  const service = googleAdsClient.getService('AccountBudgetProposalService')

  const request = new MutateAccountBudgetProposalRequest()
  request.setCustomerId(customerId)
  request.setOperation(accountBudgetProposalOperation)

  const response = await service.mutateAccountBudgetProposal(request)

  console.log(`Added an account budget proposal with resource name '%s'.`, response.getResult())
}

main().catch(console.error)
