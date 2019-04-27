'use strict'

const {
  GoogleAdsClient,
  KeywordMatchTypeEnum,
  AdGroupCriterionStatusEnum,
  AdGroupCriterionOperation,
  MutateAdGroupCriteriaRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID, KEYWORD_TEXT } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, AD_GROUP_ID, KEYWORD_TEXT])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const adGroupId = options.adGroupId || 'INSERT_AD_GROUP_ID_HERE'
  const keywordText = options.keywordText || 'mars cruise'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, adGroupId, keywordText)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} adGroupId - The ad group ID to add a keyword to.
 * @param {string} keywordText - The keyword text to add.
 */
async function runExample (googleAdsClient, customerId, adGroupId, keywordText) {
  const keywordInfo = {
    text: keywordText,
    match_type: KeywordMatchTypeEnum.KeywordMatchType.EXACT
  }

  const adGroupCriterion = googleAdsClient.buildResource('AdGroupCriterion', {
    ad_group: `customers/${customerId}/adGroups/${adGroupId}`,
    status: AdGroupCriterionStatusEnum.AdGroupCriterionStatus.ENABLED,
    keyword: keywordInfo
  })
  
  const adGroupCriterionOperation = new AdGroupCriterionOperation()
  adGroupCriterionOperation.setCreate(adGroupCriterion)

  const service = googleAdsClient.getService('AdGroupCriterionService')

  const request = new MutateAdGroupCriteriaRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupCriterionOperation])

  const response = await service.mutateAdGroupCriteria(request)

  console.log('Added %d ad group criteria:', response.getResultsList().length)

  for (const addedAdGroupCriterion of response.getResultsList()) {
    console.log(addedAdGroupCriterion.getResourceName())
  }
}

main().catch(console.error)
