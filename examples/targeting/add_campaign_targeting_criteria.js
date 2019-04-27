'use strict'

const {
  GoogleAdsClient,
  KeywordMatchTypeEnum,
  ProximityRadiusUnitsEnum,
  CampaignCriterionOperation,
  MutateCampaignCriteriaRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, CAMPAIGN_ID, KEYWORD_TEXT, LOCATION_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, CAMPAIGN_ID, KEYWORD_TEXT, LOCATION_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const campaignId = options.campaignId || 'INSERT_CAMPAIGN_ID_HERE'
  const keywordText = options.keywordText || 'INSERT_KEYWORD_TEXT_HERE'
  const locationId = options.locationId || 21167  // New York

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, campaignId, keywordText, locationId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} campaignId - The campaign ID to add a criterion to.
 * @param {string} keywordText - The keyword text to be added as a negative campaign criterion.
 * @param {string} locationId - The location ID to be targeted.
 */
async function runExample (googleAdsClient, customerId, campaignId, keywordText, locationId) {
  const campaignResourceName = `customers/${customerId}/campaigns/${campaignId}`

  const operations = [
    createNegativeKeywordCampaignCriterionOperation(googleAdsClient, keywordText, campaignResourceName),
    createLocationCampaignCriterionOperation(googleAdsClient, locationId, campaignResourceName),
    createProximityCampaignCriterionOperation(googleAdsClient, campaignResourceName)
  ]

  const service = googleAdsClient.getService('CampaignCriterionService')

  const request = new MutateCampaignCriteriaRequest()
  request.setCustomerId(customerId)
  request.setOperationsList(operations)

  const response = await service.mutateCampaignCriteria(request)

  console.log('Added %d campaign criteria:%s', response.getResultsList().length)

  for (const addedCampaignCriterion of response.getResultsList()) {
    console.log(addedCampaignCriterion.getResourceName())
  }
}

/**
 * Creates a campaign criterion operation using the specified keyword text. The keyword text
 * will be used to create a negative campaign criterion.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} keywordText - The keyword text to be added.
 * @param {string} campaignResourceName - The campaign resource name that the created criterion belongs to.
 * @return {CampaignCriterionOperation} The created campaign criterion operation.
 */
function createNegativeKeywordCampaignCriterionOperation (googleAdsClient, keywordText, campaignResourceName) {
  const campaignCriterion = {
    keyword: {
      text: keywordText,
      match_type: KeywordMatchTypeEnum.KeywordMatchType.BROAD
    },
    negative: true,
    campaign: campaignResourceName
  }

  const campaignCriterionOperation = new CampaignCriterionOperation()
  campaignCriterionOperation.setCreate(googleAdsClient.buildResource('CampaignCriterion', campaignCriterion))

  return campaignCriterionOperation
}

/**
 * Creates a campaign criterion operation using the specified location ID.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} locationId - The specified location ID.
 * @param {string} campaignResourceName - The campaign resource name that the created criterion belongs to.
 * @return {CampaignCriterionOperation} The created campaign criterion operation.
 */
function createLocationCampaignCriterionOperation (googleAdsClient, locationId, campaignResourceName) {
  const campaignCriterion = {
    location: {
      geo_target_constant: `geoTargetConstants/${locationId}`
    },
    campaign: campaignResourceName
  }

  const campaignCriterionOperation = new CampaignCriterionOperation()
  campaignCriterionOperation.setCreate(googleAdsClient.buildResource('CampaignCriterion', campaignCriterion))

  return campaignCriterionOperation
}

/**
 * Creates a campaign criterion operation for the area around a specific address (proximity).
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} campaignResourceName - The campaign resource name that the created criterion belongs to.
 * @return {CampaignCriterionOperation} The created campaign criterion operation.
 */
function createProximityCampaignCriterionOperation (googleAdsClient, campaignResourceName) {
  const campaignCriterion = {
    proximity: {
      address: {
        street_address: '38 avenue de l\'Opéra',
        city_name: 'Paris',
        postal_code: '75002',
        country_code: 'FR'
      },
      radius: 10.0,
      radius_units: ProximityRadiusUnitsEnum.ProximityRadiusUnits.MILES
    },
    campaign: campaignResourceName
  }

  const campaignCriterionOperation = new CampaignCriterionOperation()
  campaignCriterionOperation.setCreate(googleAdsClient.buildResource('CampaignCriterion', campaignCriterion))

  return campaignCriterionOperation
}

main().catch(console.error)
