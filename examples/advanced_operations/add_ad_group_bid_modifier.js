'use strict'

const {
  GoogleAdsClient,
  DeviceEnum,
  AdGroupBidModifierOperation,
  MutateAdGroupBidModifiersRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID, BID_MODIFIER_VALUE } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, AD_GROUP_ID, BID_MODIFIER_VALUE])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const adGroupId = options.adGroupId || 'INSERT_AD_GROUP_ID_HERE'
  const bidModifierValue = options.bidModifierValue || 1.5

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, adGroupId, bidModifierValue)
}

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} adGroupId - The ad group ID to add an ad group bid modifier to.
 * @param {number} bidModifierValue - The bid modifier value to set.
 */
async function runExample (googleAdsClient, customerId, adGroupId, bidModifierValue) {
  const adGroupBidModifier = {
    ad_group: `customers/${customerId}/adGroups/${adGroupId}`,
    bid_modifier: bidModifierValue,
    device: { type: DeviceEnum.Device.MOBILE }
  }

  const adGroupBidModifierOperation = new AdGroupBidModifierOperation()
  adGroupBidModifierOperation.setCreate(googleAdsClient.buildResource('AdGroupBidModifier', adGroupBidModifier))

  const service = googleAdsClient.getService('AdGroupBidModifierService')

  const request = new MutateAdGroupBidModifiersRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupBidModifierOperation])

  const response = await service.mutateAdGroupBidModifiers(request)

  console.log(`Added %d ad group bid modifier:`, response.getResultsList().length)

  for (const addedAdGroupBidModifier of response.getResultsList()) {
    console.log(addedAdGroupBidModifier.getResourceName())
  }
}

main().catch(console.error)
