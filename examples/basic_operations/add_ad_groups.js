'use strict'

const {
  GoogleAdsClient,
  AdGroupStatusEnum,
  AdGroupTypeEnum,
  AdGroupOperation,
  MutateAdGroupsRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, CAMPAIGN_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, CAMPAIGN_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const campaignId = options.campaignId || 'INSERT_CAMPAIGN_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, campaignId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} campaignId - The campaign ID to add ad groups to.
 */
async function runExample (googleAdsClient, customerId, campaignId) {
  const campaignResourceName = `customers/${customerId}/campaigns/${campaignId}`

  const operations = []

  const adgroup1 = googleAdsClient.buildResource('AdGroup', {
    name: `Earth to Mars Cruises #${Date.now()}`,
    campaign: campaignResourceName,
    status: AdGroupStatusEnum.AdGroupStatus.ENABLED,
    type: AdGroupTypeEnum.AdGroupType.SEARCH_STANDARD,
    cpc_bid_micros: 10000000
  })
  
  const adGroupOperation1 = new AdGroupOperation()
  adGroupOperation1.setCreate(adgroup1)
  operations.push(adGroupOperation1)

  const adgroup2 = googleAdsClient.buildResource('AdGroup', {
    name: `Earth to Mars Cruises #${Date.now()}`,
    campaign: campaignResourceName,
    status: AdGroupStatusEnum.AdGroupStatus.ENABLED,
    type: AdGroupTypeEnum.AdGroupType.SEARCH_STANDARD,
    cpc_bid_micros: 20000000
  })

  const adGroupOperation2 = new AdGroupOperation()
  adGroupOperation2.setCreate(adgroup2)
  operations.push(adGroupOperation2)

  const service = googleAdsClient.getService('AdGroupService')

  const request = new MutateAdGroupsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList(operations)

  const response = await service.mutateAdGroups(request)

  console.log('Added %d ad groups:', response.getResultsList().length)

  for (const addedAdGroup of response.getResultsList()) {
    console.log(addedAdGroup.getResourceName())
  }
}

main().catch(console.error)
