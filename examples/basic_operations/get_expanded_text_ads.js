'use strict'

const { GoogleAdsClient, SearchGoogleAdsRequest } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID } = require('../utils/argument_names')

const PAGE_SIZE = 1000

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, AD_GROUP_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const adGroupId = options.adGroupId || null

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, adGroupId)
}

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {customerId} customerId - The client customer ID without hyphens.
 * @param {adGroupId} adGroupId - The ad group ID for which expanded text ads will be retrieved. If `null`, returns from all ad groups.
 */
async function runExample (googleAdsClient, customerId, adGroupId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)

  let query = `
    SELECT
      ad_group.id,
      ad_group_ad.ad.id,
      ad_group_ad.ad.expanded_text_ad.headline_part1,
      ad_group_ad.ad.expanded_text_ad.headline_part2,
      ad_group_ad.status
    FROM ad_group_ad
    WHERE ad_group_ad.ad.type = EXPANDED_TEXT_AD
  `
  if (adGroupId) query += ` AND ad_group.id = ${adGroupId}`

  request.setQuery(query)
  request.setPageSize(PAGE_SIZE)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    const ad = row.getAdGroupAd().getAd()

    console.log(
      `Expanded text ad with ID %d, status %d, and headline '%s - %s' was found in ad group with ID %d.`,
      ad.getId().getValue(),
      row.getAdGroupAd().getStatus(),
      ad.getExpandedTextAd().getHeadlinePart1().getValue(),
      ad.getExpandedTextAd().getHeadlinePart2().getValue(),
      row.getAdGroup().getId().getValue()
    )
  }
}

main().catch(console.error)
