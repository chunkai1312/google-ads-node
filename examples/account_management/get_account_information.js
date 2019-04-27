'use strict'

const { GoogleAdsClient, GetCustomerRequest } = require('google-ads-node')
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
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 */
async function runExample(googleAdsClient, customerId) {
  const service = googleAdsClient.getService('CustomerService')

  const request = new GetCustomerRequest()
  request.setResourceName(`customers/${customerId}`)

  const customer = await service.getCustomer(request)

  console.log(
    `Customer with ID %d, descriptive name '%s', currency code '%s', timezone '%s', `
      + `tracking URL template '%s' and auto tagging enabled '%s' was retrieved.`,
    customer.getId().getValue(),
    customer.getDescriptiveName().getValue(),
    customer.getCurrencyCode().getValue(),
    customer.getTimeZone().getValue(),
    customer.getTrackingUrlTemplate().getValue(),
    customer.getAutoTaggingEnabled().getValue()
  )
}

main().catch(console.error)
