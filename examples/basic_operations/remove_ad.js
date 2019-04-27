'use strict'

const {
  GoogleAdsClient,
  AdGroupAdOperation,
  MutateAdGroupAdsRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID, AD_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, AD_GROUP_ID, AD_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const adGroupId = options.adGroupId || 'INSERT_AD_GROUP_ID_HERE'
  const adId = options.adId || 'INSERT_AD_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, adGroupId, adId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} adGroupId - The ad group ID that the ad group ad belongs to.
 * @param {string} adId - the ID of the ad to remove.
 */
async function runExample (googleAdsClient, customerId, adGroupId, adId) {
  const adGroupAdResourceName = `customers/${customerId}/adGroupAds/${adGroupId}~${adId}`
  const adGroupAdOperation = new AdGroupAdOperation()
  adGroupAdOperation.setRemove(adGroupAdResourceName)

  const service = googleAdsClient.getService('AdGroupAdService')

  const request = new MutateAdGroupAdsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupAdOperation])

  const response = await service.mutateAdGroupAds(request)
  const removedAdGroupAd = response.getResultsList()[0]
  console.log(`Removed ad group ad with resource name: '%s'`, removedAdGroupAd.getResourceName())
}

main().catch(console.error)
