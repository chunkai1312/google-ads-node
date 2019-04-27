'use strict'

const { 
  GoogleAdsClient,
  KeywordMatchTypeEnum,
  KeywordPlanForecastIntervalEnum,
  KeywordPlanNetworkEnum,
  KeywordPlanAdGroupOperation,
  KeywordPlanCampaignOperation,
  KeywordPlanKeywordOperation,
  KeywordPlanNegativeKeywordOperation,
  KeywordPlanOperation,
  MutateKeywordPlansRequest,
  MutateKeywordPlanCampaignsRequest,
  MutateKeywordPlanAdGroupsRequest,
  MutateKeywordPlanKeywordsRequest,
  MutateKeywordPlanNegativeKeywordsRequest
} = require('google-ads-node')
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
  const keywordPlanResource = await createKeywordPlan(googleAdsClient, customerId)

  const planCampaignResource = await createKeywordPlanCampaign(googleAdsClient, customerId, keywordPlanResource)

  const planAdGroupResource = await createKeywordPlanAdGroup(googleAdsClient, customerId, planCampaignResource)

  await createKeywordPlanKeywords(googleAdsClient, customerId, planAdGroupResource)

  await createKeywordPlanNegativeKeywords(googleAdsClient, customerId, planCampaignResource)
}

/**
 * Creates a keyword plan.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @return {string} - The newly created keyword plan resource.
 */
async function createKeywordPlan (googleAdsClient, customerId) {
  const keywordPlan = {
    name: `Keyword plan for traffic estimate #${Date.now()}`,
    forecast_period: {
      date_interval: KeywordPlanForecastIntervalEnum.KeywordPlanForecastInterval.NEXT_QUARTER
    }
  }

  const keywordPlanOperation = new KeywordPlanOperation()
  keywordPlanOperation.setCreate(googleAdsClient.buildResource('KeywordPlan', keywordPlan))

  const service = googleAdsClient.getService('KeywordPlanService')

  const request = new MutateKeywordPlansRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([keywordPlanOperation])

  const response = await service.mutateKeywordPlans(request)
  const resourceName = response.getResultsList()[0].getResourceName()
  console.log('Created keyword plan: %s', resourceName)

  return resourceName
}

/**
 * Creates the campaign for the keyword plan.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} keywordPlanResource - The keyword plan resource.
 * @return {string} The newly created campaign resource.
 */
async function createKeywordPlanCampaign (googleAdsClient, customerId, keywordPlanResource) {
  const keywordPlanCampaign = googleAdsClient.buildResource('KeywordPlanCampaign', {
    name: `Keyword plan campaign #${Date.now()}`,
    cpc_bid_micros: 1000000,
    keyword_plan_network: KeywordPlanNetworkEnum.KeywordPlanNetwork.GOOGLE_SEARCH,
    keyword_plan: keywordPlanResource,
    geo_targets: [{ geo_target_constant: 'geoTargetConstants/2840' }],
    language_constants: ['languageConstants/1000']
  })

  // TODO:
  const keywordPlanGeoTarget = googleAdsClient.buildResource('KeywordPlanGeoTarget', {
    geo_target_constant: 'geoTargetConstants/2840'
  })
  keywordPlanCampaign.setGeoTargetsList([keywordPlanGeoTarget])
  // keywordPlanCampaign.setLanguageConstantsList()

  const keywordPlanCampaignOperation = new KeywordPlanCampaignOperation()
  keywordPlanCampaignOperation.setCreate(keywordPlanCampaign)

  const service = googleAdsClient.getService('KeywordPlanCampaignService')

  const request = new MutateKeywordPlanCampaignsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([keywordPlanCampaignOperation])

  const response = await service.mutateKeywordPlanCampaigns(request)
  const planCampaignResource = await response.getResultsList()[0].getResourceName()
  console.log('Created campaign for keyword plan: %s', planCampaignResource)

  return planCampaignResource
}

/**
 * Creates the ad group for the keyword plan.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} planCampaignResource - The resource name of the campaign under which the ad group is created.
 * @return {string} The newly created ad group resource.
 */
async function createKeywordPlanAdGroup (googleAdsClient, customerId, planCampaignResource) {
  const keywordPlanAdGroup = {
    name: `Keyword plan ad group #${Date.now()}`,
    cpc_bid_micros: 2500000,
    keyword_plan_campaign: planCampaignResource
  }

  const keywordPlanAdGroupOperation = new KeywordPlanAdGroupOperation()
  keywordPlanAdGroupOperation.setCreate(googleAdsClient.buildResource('KeywordPlanAdGroup', keywordPlanAdGroup))

  const service = googleAdsClient.getService('KeywordPlanAdGroupService')

  const request = new MutateKeywordPlanAdGroupsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([keywordPlanAdGroupOperation])

  const response = await service.mutateKeywordPlanAdGroups(request)
  const planAdGroupResource = await response.getResultsList()[0].getResourceName()
  console.log('Created ad group for keyword plan: %s', planAdGroupResource)

  return planAdGroupResource
}

/**
 * Creates keywords for the keyword plan.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} planAdGroupResource - The resource name of the ad group under which the keywords are created.
 */
async function createKeywordPlanKeywords (googleAdsClient, customerId, planAdGroupResource) {
  const keywordPlanKeyword1 = {
    text: 'mars cruise',
    cpc_bid_micros: 2000000,
    match_type: KeywordMatchTypeEnum.KeywordMatchType.BROAD,
    keyword_plan_ad_group: planAdGroupResource
  }
  
  const keywordPlanKeyword2 = {
    text: 'cheap cruise',
    cpc_bid_micros: 15000000,
    match_type: KeywordMatchTypeEnum.KeywordMatchType.PHRASE,
    keyword_plan_ad_group: planAdGroupResource
  }

  const keywordPlanKeyword3 = {
    text: 'jupiter cruise',
    cpc_bid_micros: 1990000,
    match_type: KeywordMatchTypeEnum.KeywordMatchType.EXACT,
    keyword_plan_ad_group: planAdGroupResource
  }

  const keywordPlanKeywords = [keywordPlanKeyword1, keywordPlanKeyword2, keywordPlanKeyword3]

  const keywordPlanKeywordOperations = []

  keywordPlanKeywords.forEach(keyword => {
    const keywordPlanKeywordOperation = new KeywordPlanKeywordOperation()
    keywordPlanKeywordOperation.setCreate(googleAdsClient.buildResource('KeywordPlanKeyword', keyword))
    keywordPlanKeywordOperations.push(keywordPlanKeywordOperation)
  })

  const service = googleAdsClient.getService('KeywordPlanKeywordService')

  const request = new MutateKeywordPlanKeywordsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList(keywordPlanKeywordOperations)

  const response = await service.mutateKeywordPlanKeywords(request)

  for (const result of response.getResultsList()) {
    console.log('Created keyword for keyword plan: %s', result.getResourceName())
  }
}

/**
 * Creates negative keywords for the keyword plan.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} planCampaignResource - The resource name of the campaign under which the keywords are created.
 */
async function createKeywordPlanNegativeKeywords (googleAdsClient, customerId, planCampaignResource) {
  const keywordPlanNegativeKeyword = {
    text: 'moon walk',
    match_type: KeywordMatchTypeEnum.KeywordMatchType.BROAD,
    keyword_plan_campaign: planCampaignResource
  }

  const keywordPlanNegativeKeywordOperation = new KeywordPlanNegativeKeywordOperation()
  keywordPlanNegativeKeywordOperation.setCreate(googleAdsClient.buildResource('KeywordPlanNegativeKeyword', keywordPlanNegativeKeyword))

  const service = googleAdsClient.getService('KeywordPlanNegativeKeywordService')

  const request = new MutateKeywordPlanNegativeKeywordsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([keywordPlanNegativeKeywordOperation])

  const response = await service.mutateKeywordPlanNegativeKeywords(request)

  for (const result of response.getResultsList()) {
    console.log('Created negative keyword for keyword plan: %s', result.getResourceName())
  }
}

main().catch(console.error)
