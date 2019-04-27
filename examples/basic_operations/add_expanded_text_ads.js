'use strict'

const {
  GoogleAdsClient,
  AdGroupAdStatusEnum,
  AdGroupAdOperation,
  MutateAdGroupAdsRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID } = require('../utils/argument_names')

const NUMBER_OF_ADS_TO_ADD = 2

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
 * @param {string} adGroupId - The ad group ID to add a keyword to.
 */
async function runExample (googleAdsClient, customerId, adGroupId) {
  const adGroupResourceName = `customers/${customerId}/adGroups/${adGroupId}`

  const operations = []
  for (let i = 0; i < NUMBER_OF_ADS_TO_ADD; i++) {
    const expandedTextAdInfo = {
      headline_part1: `Cruise to Mars #${Date.now()}`,
      headline_part2: 'Best Space Cruise Line',
      description: 'Buy your tickets now!'
    }

    const ad = {
      expanded_text_ad: expandedTextAdInfo,
      final_urls: ['http://www.example.com']
    }

    const adGroupAd = googleAdsClient.buildResource('AdGroupAd', {
      ad_group: adGroupResourceName,
      status: AdGroupAdStatusEnum.AdGroupAdStatus.PAUSED,
      ad: ad
    })

    const adGroupAdOperation = new AdGroupAdOperation()
    adGroupAdOperation.setCreate(adGroupAd)
    operations.push(adGroupAdOperation)
  }
  
  const service = googleAdsClient.getService('AdGroupAdService')

  const request = new MutateAdGroupAdsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList(operations)

  const response = await service.mutateAdGroupAds(request)

  for (const addedAdGroupAd of response.getResultsList()) {
    console.log(
      `Expanded text ad was created with resource name: '%s'`,
      addedAdGroupAd.getResourceName()
    )
  }
}

main().catch(console.error)
