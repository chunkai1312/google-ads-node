'use strict'

const { GoogleAdsClient, BillingSetupOperation, MutateBillingSetupRequest } = require('google-ads-node')
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
 * @param {string} billingSetupId - The ID of the billing setup to remove.
 */
async function runExample (googleAdsClient, customerId, billingSetupId) {
  const billingSetupResourceName = `customers/${customerId}/billingSetups/${billingSetupId}`

  const service = googleAdsClient.getService('BillingSetupService')

  const billingSetupOperation = new BillingSetupOperation()
  billingSetupOperation.setRemove(billingSetupResourceName)

  const request = new MutateBillingSetupRequest()
  request.setCustomerId(customerId)
  request.setOperation(billingSetupOperation)

  const response = await service.mutateBillingSetup(request)
  const removedBillingSetup = response.getResult()
  console.log(`Removed billing setup with resource name '%s'`, removedBillingSetup.getResourceName())
}

main().catch(console.error)
