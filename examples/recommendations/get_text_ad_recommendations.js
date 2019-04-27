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
    SELECT
      recommendation.type,
      recommendation.campaign,
      recommendation.text_ad_recommendation
    FROM recommendation
    WHERE recommendation.type = TEXT_AD
  `)
  request.setPageSize(PAGE_SIZE)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    const recommendation = row.getRecommendation()

    console.log(
      `Recommendation with resource name '%s' was found for campaign with resource name '%s':`,
      recommendation.getResourceName(),
      recommendation.getCampaign().getValue()
    )

    const recommendedAd = recommendation.getTextAdRecommendation().getAd()

    if (recommendedAd.getExpandedTextAd()) {
      const recommendedExpandedTextAd = recommendedAd.getExpandedTextAd()
      console.log(`\tHeadline part 1 is '%s'.`, recommendedExpandedTextAd.getHeadlinePart1().getValue())
      console.log(`\tHeadline part 2 is '%s'.`, recommendedExpandedTextAd.getHeadlinePart2().getValue())
      console.log(`\tDescription is '%s'`, recommendedExpandedTextAd.getDescription().getValue())
    }

    if (recommendedAd.getDisplayUrl()) {
      console.log(`\tDisplay URL is '%s'.`, recommendedExpandedTextAd.getHeadlinePart1().getValue())
    }

    for (const finalUrl of recommendedAd.getFinalUrls()) {
      console.log(`\tFinal URL is '%s'.`, finalUrl.getValue())
    }

    for (const finalMobileUrl of recommendedAd.getFinalMobileUrls()) {
      console.log(`\tFinal Mobile URL is '%s'.`, finalMobileUrl.getValue())
    }
  }
}

main().catch(console.error)
