'use strict'

const { GoogleAdsClient, DismissRecommendationOperation, DismissRecommendationRequest } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, RECOMMENDATION_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, RECOMMENDATION_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const recommendationId = options.recommendationId || 'INSERT_RECOMMENDATION_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, recommendationId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} recommendationId - The recommendation ID to dismiss.
 */
async function runExample (googleAdsClient, customerId, recommendationId) {
  const recommendationResourceName = `customers/${customerId}/recommendations/${recommendationId}`
  const dismissRecommendationOperation = new DismissRecommendationOperation()
  dismissRecommendationOperation.setResourceName(recommendationResourceName)

  const service = googleAdsClient.getService('RecommendationService')

  const request = new DismissRecommendationRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([dismissRecommendationOperation])

  const response = await service.applyRecommendation(request)

  const appliedRecommendation = response.getResultsList()[0]

  console.log(
    `Dismissed recommendation with resource name: '%s'.`,
    appliedRecommendation.getResourceName()
  )
}

main().catch(console.error)
