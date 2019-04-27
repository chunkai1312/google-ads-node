'use strict'

const {
  GoogleAdsClient,
  AdGroupCriterionStatusEnum,
  AdGroupCriterionOperation,
  MutateAdGroupCriteriaRequest
} = require('google-ads-node')
const { getFieldMask } = require('google-ads-node/build/lib/utils')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID, CRITERION_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, AD_GROUP_ID, CRITERION_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const adGroupId = options.adGroupId || 'INSERT_AD_GROUP_ID_HERE'
  const criterionId = options.criterionId || 'INSERT_CRITERION_ID_HERE'


  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, adGroupId, criterionId)
}

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} adGroupId - The ad group ID that the ad group criterion belongs to.
 * @param {string} criterionId - The ID of the ad group criterion to remove.
 */
async function runExample (googleAdsClient, customerId, adGroupId, criterionId) {
  const adGroupCriterionResourceName = `customers/${customerId}/adGroupCriteria/${adGroupId}~${criterionId}`
  const adGroupCriterionOperation = new AdGroupCriterionOperation()
  adGroupCriterionOperation.setRemove(adGroupCriterionResourceName)

  const service = googleAdsClient.getService('AdGroupCriterionService')

  const request = new MutateAdGroupCriteriaRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupCriterionOperation])

  const response = await service.mutateAdGroupCriteria(request)
  const removedAdGroupCriterion = response.getResultsList()[0]
  console.log(`Removed ad group criterion with resource name: '%s'`, removedAdGroupCriterion.getResourceName())
}

main().catch(console.error)
