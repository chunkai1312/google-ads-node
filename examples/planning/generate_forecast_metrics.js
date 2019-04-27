'use strict'

const { GoogleAdsClient, GenerateForecastMetricsRequest } = require('google-ads-node')
const moment = require('moment')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, KEYWORD_PLAN_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, KEYWORD_PLAN_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const keywordPlanId = options.keywordPlanId || 'INSERT_KEYWORD_PLAN_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, keywordPlanId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} keywordPlanId - The keyword plan ID.
 */
async function runExample (googleAdsClient, customerId, keywordPlanId) {
  const planResourceName = `customers/${customerId}/keywordPlans/${keywordPlanId}`

  const service = googleAdsClient.getService('KeywordPlanService')

  const request = new GenerateForecastMetricsRequest()
  request.setKeywordPlan(planResourceName)

  const response = await service.generateForecastMetrics(request)

  let i = 0
  for (const forecast of response.getKeywordForecastsList()) {
    const metrics = forecast.getKeywordForecast()
    console.log('%d) Keyword ID: %s', ++i, forecast.getKeywordPlanAdGroupKeyword().getValue())
    console.log('Estimated daily clicks: %s', metrics.getClicks() ? metrics.getClicks().getValue() : 'null')
    console.log('Estimated daily impressions: %s', metrics.getImpressions() ? metrics.getImpressions().getValue() : 'null')
    console.log('Estimated average cpc (micros): %s', metrics.getAverageCpc() ? metrics.getAverageCpc().getValue() : 'null')
  }
}

main().catch(console.error)
