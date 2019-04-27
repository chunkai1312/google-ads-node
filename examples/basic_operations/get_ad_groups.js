'use strict'

const { GoogleAdsClient, SearchGoogleAdsRequest } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, CAMPAIGN_ID } = require('../utils/argument_names')

const PAGE_SIZE = 1000

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, CAMPAIGN_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const campaignId = options.campaignId || null

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, campaignId)
}

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} campaignId - The campaign ID for which ad groups will be retrieved. If `null`, returns from all campaigns.
 */
async function runExample (googleAdsClient, customerId, campaignId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)

  let query = `
    SELECT campaign.id, ad_group.id, ad_group.name
    FROM ad_group
  `
  if (campaignId) query += ` WHERE campaign.id = ${campaignId}`

  request.setQuery(query)
  request.setPageSize(PAGE_SIZE)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    console.log(
      `Ad group with ID %d and name '%s' was found in campaign with ID %d.`,
      row.getAdGroup().getId().getValue(),
      row.getAdGroup().getName().getValue(),
      row.getAdGroup().getId().getValue()
    )
  }
}

main().catch(console.error)
