'use strict'

const { GoogleAdsClient, SearchGoogleAdsRequest } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID } = require('../utils/argument_names')


async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, AD_GROUP_ID])

  const googleAdsClient = new GoogleAdsClient()

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const adGroupId = options.adGroupId || null

  await runExample(googleAdsClient, customerId, adGroupId)
}

const PAGE_SIZE = 1000

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} adGroupId - The ad group ID for which ad group bid modifiers will be retrieved. If `null`, returns from all ad groups.
 */
async function runExample (googleAdsClient, customerId, adGroupId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)

  let query = `
    SELECT
      ad_group.id,
      ad_group_bid_modifier.criterion_id,
      ad_group_bid_modifier.bid_modifier,
      ad_group_bid_modifier.device.type,
      campaign.id
    FROM ad_group_bid_modifier
  `
  if (adGroupId) query += ` WHERE ad_group.id = ${adGroupId}`

  request.setQuery(query)
  request.setPageSize(PAGE_SIZE)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    console.log(
      `Ad group bid modifier with criterion ID %d, bid modifier value %d, device type %d was found in an ad group ID %d of campaign ID %d.`,
      row.getAdGroupBidModifier().getCriterionId().getValue(),
      row.getAdGroupBidModifier().getBidModifier().getValue(),
      row.getAdGroupBidModifier().getDevice().getType(),
      row.getAdGroup().getId().getValue(),
      row.getCampaign().getId().getValue()
    )
  }
}

main().catch(console.error)
