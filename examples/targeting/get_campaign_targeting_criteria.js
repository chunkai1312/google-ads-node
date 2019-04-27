'use strict'

const util = require('util')
const { GoogleAdsClient, SearchGoogleAdsRequest, CriterionTypeEnum } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, CAMPAIGN_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, CAMPAIGN_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const campaignId = options.campaignId || 'INSERT_CAMPAIGN_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, campaignId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} campaignId - The campaign ID for which campaign criteria will be retrieved.
 */
async function runExample (googleAdsClient, customerId, campaignId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)
  request.setQuery(`
    SELECT
      campaign.id,
      campaign_criterion.campaign,
      campaign_criterion.criterion_id,
      campaign_criterion.type,
      campaign_criterion.negative,
      campaign_criterion.keyword.text,
      campaign_criterion.keyword.match_type
    FROM campaign_criterion
    WHERE campaign.id = ${campaignId}
  `)
  request.setPageSize(1000)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    const campaignCriterion = row.getCampaignCriterion()
  
    let line = util.format(
      `Campaign criterion with ID %d was found as a %s`,
      campaignCriterion.getCriterionId().getValue(),
      campaignCriterion.getNegative().getValue() ? 'negative ' : ''
    )

    if (campaignCriterion.getType() === CriterionTypeEnum.CriterionType.KEYWORD) {
      line += util.format(
        `keyword with text '%s' and match type %d.`,
        campaignCriterion.getKeyword().getText().getValue(),
        campaignCriterion.getKeyword().getMatchType()
      )
    } else {
      line += util.format('non-keyword.')
    }

    console.log(line)
  }
}

main().catch(console.error)
