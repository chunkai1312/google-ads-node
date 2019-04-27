'use strict'

const { GoogleAdsClient, SearchGoogleAdsRequest } = require('google-ads-node')
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
    SELECT campaign.id, campaign.name
    FROM campaign
    ORDER BY campaign.id
  `)
  request.setPageSize(PAGE_SIZE)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    console.log(
      `Campaign with ID %d and name '%s' was found.`,
      row.getCampaign().getId().getValue(),
      row.getCampaign().getName().getValue()
    )
  }
}

main().catch(console.error)
