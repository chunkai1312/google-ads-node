'use strict'

const {
  GoogleAdsClient,
  GenerateKeywordIdeaResult,
  KeywordAndUrlSeed,
  KeywordSeed,
  UrlSeed,
  KeywordPlanNetworkEnum,
  GenerateKeywordIdeasRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, LOCATION_ID, LANGUAGE_ID, KEYWORD_TEXT, PAGE_URL } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, LOCATION_ID, LANGUAGE_ID, KEYWORD_TEXT, PAGE_URL])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const locationIds = options.locationId || ['INSERT_LOCATION_ID_1_HERE', 'INSERT_LOCATION_ID_2_HERE']
  const languageId = options.languageId || 'INSERT_LANGUAGE_ID_HERE'
  const keywords = options.keywordText || ['INSERT_KEYWORD_TEXT_1_HERE', 'INSERT_KEYWORD_TEXT_2_HERE']
  const pageUrl = options.pageUrl || null

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, locationIds, languageId, keywords, pageUrl)
}

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string[]} locationIds - The location IDs.
 * @param {string} languageId - The language ID.
 * @param {string[]} keywords - The list of keywords to use as a seed for ideas.
 * @param {string} pageUrl - Optional URL related to your business to use as a seed for ideas.
 */
async function runExample (googleAdsClient, customerId, locationIds, languageId, keywords, pageUrl) {
  if (!keywords && !pageUrl) {
    throw new Error('At least one of keywords or page URL is required, but neither was specified.')
  }

  const language = `languageConstants/${languageId}`
  const geoTargetConstants = locationIds.map(id => `geoTargetConstants/${id}`)

  const service = googleAdsClient.getService('KeywordPlanIdeaService')

  const request = googleAdsClient.buildResource('GenerateKeywordIdeasRequest', {
    language: language,
    geo_target_constants: geoTargetConstants
  }) 
  request.setCustomerId(customerId)
  request.setKeywordPlanNetwork(KeywordPlanNetworkEnum.KeywordPlanNetwork.GOOGLE_SEARCH_AND_PARTNERS)

  if (!keywords) {
    request.setUrlSeed(googleAdsClient.buildResource('UrlSeed', { url: pageUrl }))
  } else if (!pageUrl) {
    request.setKeywordSeed(googleAdsClient.buildResource('KeywordSeed', { keywords: keywords }))
  } else {
    request.setKeywordAndUrlSeed(googleAdsClient.buildResource('KeywordAndUrlSeed', { url: pageUrl, keywords: keywords }))
  }

  const response = await service.generateKeywordIdeas(request)

  for (const result of response.getResultsList()) {
    console.log(
      `Keyword idea text '%s' has %d average monthly searches and competition as %d.`,
      result.getText().getValue(),
      !result.getKeywordIdeaMetrics() ? 0 : result.getKeywordIdeaMetrics().getAvgMonthlySearches().getValue(),
      !result.getKeywordIdeaMetrics() ? 0 : result.getKeywordIdeaMetrics().getCompetition(),      
    )
  }
}

main().catch(console.error)
