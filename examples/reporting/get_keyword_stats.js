'use strict'

const {
  GoogleAdsClient,
  SearchGoogleAdsRequest,
  KeywordMatchTypeEnum,
} = require("google-ads-node");

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
async function runExample (googleAdsClient, customerId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)
  request.setQuery(`
    SELECT 
      campaign.id, 
      campaign.name, 
      ad_group.id, 
      ad_group.name,
      ad_group_criterion.criterion_id,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      metrics.impressions, 
      metrics.clicks, 
      metrics.cost_micros
    FROM 
      keyword_view 
    WHERE 
      segments.date DURING LAST_7_DAYS
      AND campaign.advertising_channel_type = "SEARCH"
      AND ad_group.status = "ENABLED"
      AND ad_group_criterion.status IN ("ENABLED", "PAUSED")
    ORDER BY 
      metrics.impressions DESC
    LIMIT 50
  `)
  request.setPageSize(1000)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    const campaign = row.getCampaign()
    const adGroup = row.getAdGroup()
    const adGroupCriterion = row.getAdGroupCriterion()
    const metrics = row.getMetrics()

    console.log(
      `Keyword text '%s' with `
      + `match type %d `
      + `and ID %d `
      + `in ad group '%s' `
      + `with ID %d `
      + `in campaign '%s' `
      + `with ID %d `
      + `had %d impression(s), `
      + `%d click(s), `
      + `and %d cost (in micros) `
      + `during the last 7 days.`,
      adGroupCriterion.getKeyword().getText().getValue(),
      adGroupCriterion.getKeyword().getMatchType(),
      adGroupCriterion.getCriterionId().getValue(),
      adGroup.getName().getValue(),
      adGroup.getId().getValue(),
      campaign.getName().getValue(),
      campaign.getId().getValue(),
      metrics.getImpressions().getValue(),
      metrics.getClicks().getValue(),
      metrics.getCostMicros().getValue()
    )
  }
}

main().catch(console.error)
