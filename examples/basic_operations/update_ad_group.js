'use strict'

const { GoogleAdsClient, AdGroupStatusEnum, AdGroupOperation, MutateAdGroupsRequest } = require('google-ads-node')
const { getFieldMask } = require('google-ads-node/build/lib/utils')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID, CPC_BID_CEILING_MICRO_AMOUNT } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, AD_GROUP_ID, CPC_BID_CEILING_MICRO_AMOUNT])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const adGroupId = options.adGroupId || 'INSERT_AD_GROUP_ID_HERE'
  const cpcBidMicroAmount = options.cpcBidMicroAmount || 'INSERT_CPC_BID_MICRO_AMOUNT_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, adGroupId, cpcBidMicroAmount)
}

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} GoogleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} adGroupId - The ID of ad group to update.
 * @param {number} cpcBidMicroAmount - The bid amount in micros to use for the ad group bid.
 */
async function runExample (GoogleAdsClient, customerId, adGroupId, cpcBidMicroAmount) {
  const adGroup = {
    resource_name: `customers/${customerId}/adGroups/${adGroupId}`,
    cpc_bid_micros: cpcBidMicroAmount,
    status: AdGroupStatusEnum.AdGroupStatus.PAUSED
  }

  const adGroupOperation = new AdGroupOperation()
  adGroupOperation.setUpdate(GoogleAdsClient.buildResource('AdGroup', adGroup))
  adGroupOperation.setUpdateMask(getFieldMask(adGroup))

  const service = GoogleAdsClient.getService('AdGroupService')

  const request = new MutateAdGroupsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupOperation])

  const response = await service.mutateAdGroups(request)
  const updatedAdGroup = response.getResultsList()[0]
  console.log(`Updated ad group with resource name: '%s'`, updatedAdGroup.getResourceName())
}

main().catch(console.error)
