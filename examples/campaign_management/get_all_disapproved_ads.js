'use strict'

const { GoogleAdsClient, SearchGoogleAdsRequest, PolicyApprovalStatusEnum } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, CAMPAIGN_ID } = require('../utils/argument_names')

const PAGE_SIZE = 1000

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
 * @param {string} campaignId - The campaign ID for which campaign ads will be retrieved.
 */
async function runExample (googleAdsClient, customerId, campaignId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)
  request.setQuery(`
    SELECT
      ad_group_ad.ad.id,
      ad_group_ad.ad.type,
      ad_group_ad.policy_summary
    FROM ad_group_ad
    WHERE campaign.id = ${campaignId}
  `)
  request.setPageSize(PAGE_SIZE)

  const response = await service.search(request)

  let disapprovedAdsCount = 0

  for (const row of response.getResultsList()) {
    const adGroupAd = row.getAdGroupAd()
    const policySummary = adGroupAd.getPolicySummary()
    const ad = adGroupAd.getAd()

    if (policySummary.getApprovalStatus() !== PolicyApprovalStatusEnum.PolicyApprovalStatus.DISAPPROVED) {
      continue
    }

    disapprovedAdsCount++

    console.log(
      `Ad with ID %d and type '%d' was disapproved with the following policy topic entries:`,
      ad.getId().getValue(),
      ad.getType()
    )
    
    for (const policyTopicEntry of policySummary.getPolicyTopicEntriesList()) {
      console.log(
        `  topic: '%s', type: '%d'`,
        policyTopicEntry.getTopic().getValue(),
        policyTopicEntry.getType()
      )

      for (const evidence of policyTopicEntry.getEvidencesList()) {
        const textList = evidence.getTextList()

        for (let i = 0; i < textList.getTextsList().length; i++) {
          console.log(`    evidence text[%d]: '%s'`, i, $textList.getTextsList()[i].getValue())
        }
      }
    }
  }

  console.log(`Number of disapproved ads found: %d`, disapprovedAdsCount)
}

main().catch(console.error)
