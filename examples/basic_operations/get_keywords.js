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
 * @param {string} customerId - The client customer ID without hyphens
 * @param {string} adGroupId - The ad group ID for which keywords will be retrieved. If `null`, returns from all ad groups.
 */
async function runExample (googleAdsClient, customerId, adGroupId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)
  let query = `
    SELECT
      ad_group.id,
      ad_group_criterion.type,
      ad_group_criterion.criterion_id,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type
    FROM ad_group_criterion
    WHERE ad_group_criterion.type = KEYWORD
  `
  if (adGroupId) query += ` AND ad_group.id = ${adGroupId}`
  request.setQuery(query)
  request.setPageSize(PAGE_SIZE)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    console.log(
      `Keyword with text '%s', match type %d, criterion type %d, and ID %d was found in ad group with ID %d.`,
      row.getAdGroupCriterion().getKeyword().getText().getValue(),
      row.getAdGroupCriterion().getKeyword().getMatchType(),
      row.getAdGroupCriterion().getType(),
      row.getAdGroupCriterion().getCriterionId().getValue(),
      row.getAdGroup().getId().getValue()
    )
  }
}

main().catch(console.error)
