'use strict'

const {
  GoogleAdsClient,
  AdGroupOperation,
  MutateAdGroupsRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, AD_GROUP_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const adGroupId = options.adGroupId || 'INSERT_AD_GROUP_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, adGroupId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} adGroupId - The ID of ad group to remove.
 */
async function runExample (googleAdsClient, customerId, adGroupId) {
  const adGroupResourceName = `customers/${customerId}/adGroups/${adGroupId}`
  const adGroupOperation = new AdGroupOperation()
  adGroupOperation.setRemove(adGroupResourceName)

  const service = googleAdsClient.getService('AdGroupService')

  const request = new MutateAdGroupsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupOperation])

  const response = await service.mutateAdGroups(request)
  const removedAdGroup = response.getResultsList()[0]
  console.log(`Removed ad group with resource name: '%s'`, removedAdGroup.getResourceName())
}

main().catch(console.error)
