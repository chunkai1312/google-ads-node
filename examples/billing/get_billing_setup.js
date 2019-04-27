'use strict'

const { GoogleAdsClient, SearchGoogleAdsRequest, PolicyApprovalStatusEnum } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient 
 * @param {string} customerId 
 */
async function runExample (googleAdsClient, customerId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)
  request.setQuery(`
    SELECT
      billing_setup.id,
      billing_setup.status,
      billing_setup.payments_account_info.payments_account_id,
      billing_setup.payments_account_info.payments_account_name,
      billing_setup.payments_account_info.payments_profile_id,
      billing_setup.payments_account_info.payments_profile_name,
      billing_setup.payments_account_info.secondary_payments_profile_id
    FROM billing_setup
  `)
  request.setPageSize(1000)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    const paymentAccountInfo = row.getBillingSetup().getPaymentsAccountInfo()
    if (!paymentAccountInfo) {
      console.log(`Found the billing setup with ID '%s'`, row.getBillingSetup().getId().getValue())
      console.log(`  status '%s' with no payment account info.`, row.getBillingSetup().getStatus())
      continue
    }

    console.log(`Found the billing setup with ID '%s'`, row.getBillingSetup().getId().getValue())
    console.log(`  status '%s'`, row.getBillingSetup().getStatus())
    console.log(`  payments account ID '%s'`, paymentAccountInfo.getPaymentsAccountId().getValue())
    console.log(`  payments account name '%s'`, paymentAccountInfo.getPaymentsAccountName().getValue())
    console.log(`  payments profile ID '%s'`, paymentAccountInfo.getPaymentsProfileId().getValue())
    console.log(`  payments profile name '%s'`, paymentAccountInfo.getPaymentsProfileName().getValue())
    console.log(`  secondary payments profile ID '%s'`, paymentAccountInfo.getSecondaryPaymentsProfileId() ? paymentAccountInfo.getSecondaryPaymentsProfileId().getValue() : 'None')
  }
}

main().catch(console.error)
