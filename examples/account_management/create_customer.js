'use strict'

const { GoogleAdsClient, CreateCustomerClientRequest } = require('google-ads-node')
const dateFormat = require('dateformat')
const { parseCommandArguments } = require('../utils/argument_parser')
const { MANAGER_CUSTOMER_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([MANAGER_CUSTOMER_ID])

  const managerCustomerId = options.managerCustomerId || 'INSERT_MANAGER_CUSTOMER_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, options.managerCustomerId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} managerCustomerId - The manager customer ID without hyphens.
 */
async function runExample (googleAdsClient, managerCustomerId) {
  const customer = googleAdsClient.buildResource('Customer', {
    descriptive_name: `Account created with CustomerService on ${dateFormat(new Date(), 'yyyymmdd HH:MM:ss')}`,
    currency_code: 'USD',
    time_zone: 'America/New_York',
    tracking_url_template: '{lpurl}?device={device}',
    final_url_suffix: 'keyword={keyword}&matchtype={matchtype}&adgroupid={adgroupid}',
    has_partners_badge: false
  })

  const service = googleAdsClient.getService('CustomerService')

  const request = new CreateCustomerClientRequest()
  request.setCustomerId(managerCustomerId)
  request.setCustomerClient(customer)

  const response = await service.createCustomerClient(request)

  console.log(
    `Created a customer with resource name '%s' under the manager account with customer ID '%s'.`,
    response.getResourceName(),
    managerCustomerId
  )
}

main().catch(console.error)
