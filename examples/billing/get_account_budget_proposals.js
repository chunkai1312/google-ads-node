'use strict'

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
 * @param {customerId} customerId - The client customer ID without hyphens.
 */
async function runExample (googleAdsClient, customerId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)
  request.setQuery(`
    SELECT
      account_budget_proposal.id,
      account_budget_proposal.account_budget,
      account_budget_proposal.billing_setup,
      account_budget_proposal.status,
      account_budget_proposal.proposed_name,
      account_budget_proposal.proposed_notes,
      account_budget_proposal.proposed_purchase_order_number,
      account_budget_proposal.proposal_type,
      account_budget_proposal.approval_date_time,
      account_budget_proposal.creation_date_time
    FROM account_budget_proposal
  `)
  request.setPageSize(PAGE_SIZE)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    const accountBudgetProposal = row.getAccountBudgetProposal()
    console.log(`Found the account budget proposal with ID '%s'`, accountBudgetProposal.getId().getValue())
    console.log(`  status '%s'`, accountBudgetProposal.getStatus())
    console.log(`  account budget '%s'`, accountBudgetProposal.getAccountBudget().getValue())
    console.log(`  billing setup '%s'`, accountBudgetProposal.getBillingSetup().getValue())
    console.log(`  proposed name '%s'`, accountBudgetProposal.getProposedName().getValue())
    console.log(`  proposed notes '%s'`, accountBudgetProposal.getProposedNotes().getValue())
    console.log(`  proposed PO number '%s'`, accountBudgetProposal.getProposedPurchaseOrderNumber().getValue())
    console.log(`  proposal type '%s'`, accountBudgetProposal.getProposalType())
    console.log(`  approval date time '%s'`, accountBudgetProposal.getApprovalDateTime().getValue())
    console.log(`  creation date time '%s'`, accountBudgetProposal.getCreationDateTime().getValue())
  }
}

main().catch(console.error)
