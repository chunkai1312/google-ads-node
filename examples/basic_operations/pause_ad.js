'use strict'

const { GoogleAdsClient, AdGroupAdStatusEnum, AdGroupAdOperation, MutateAdGroupAdsRequest } = require('google-ads-node')
const { getFieldMask } = require('google-ads-node/build/lib/utils')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID, CAMPAIGN_ID, AD_ID } = require('../utils/argument_names')

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
 * @param {string} adId - The ID of the ad to pause.
 */
async function runExample (googleAdsClient, customerId, adGroupId, adId) {
  const adGroupAd = {
    resource_name: `customers/${customerId}/adGroupAds/${adGroupId}~${adId}`,
    status: AdGroupAdStatusEnum.AdGroupAdStatus.PAUSED
  }

  const adGroupAdOperation = new AdGroupAdOperation()
  adGroupAdOperation.setUpdate(googleAdsClient.buildResource('AdGroupAd', adGroupAd))
  adGroupAdOperation.setUpdateMask(getFieldMask(adGroupAd))

  const service = googleAdsClient.getService('AdGroupAdService')

  const request = new MutateAdGroupAdsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupAdOperation])

  const response = await service.mutateAdGroupAds(request)
  const pausedAdGroupAd = response.getResultsList()[0]
  console.log(`Ad group ad with resource name: '%s' is paused.`, pausedAdGroupAd.getResourceName())
}

main().catch(console.error)
