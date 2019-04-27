'use strict'

const {
  GoogleAdsClient,
  AdGroupAdStatusEnum,
  AdGroupAdOperation,
  MutateAdGroupAdsRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, AD_GROUP_ID, BID_MODIFIER_VALUE } = require('../utils/argument_names')

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
  const expandedTextAdInfo = {
    headline_part1: `Luxury Cruise to Mars`,
    headline_part2: 'Visit the Red Planet in style.',
    description: 'Low-gravity fun for everyone!'
  }

  const ad = {
    expanded_text_ad: expandedTextAdInfo,
    final_urls: [
      'http://www.example.com/cruise/space/',
      'http://www.example.com/locations/mars/'
    ],
    tracking_url_template: 'http://tracker.example.com/?season={_season}&promocode={_promocode}&u={lpurl}',
    // url_custom_parameters: [
    //   { key: 'season', 'value': 'christmas' },
    //   { key: 'promocode', 'value': 'NY123' },
    // ],
    final_mobile_urls: [
      'http://mobile.example.com/cruise/space/',
      'http://mobile.example.com/locations/mars/'
    ]
  }

  const adGroupAd = {
    ad_group: `customers/${customerId}/adGroups/${adGroupId}`,
    status: AdGroupAdStatusEnum.AdGroupAdStatus.PAUSED,
    ad: ad,
  }

  const adGroupAdOperation = new AdGroupAdOperation()
  adGroupAdOperation.setCreate(googleAdsClient.buildResource('AdGroupAd', adGroupAd))

  const service = googleAdsClient.getService('AdGroupAdService')

  const request = new MutateAdGroupAdsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupAdOperation])

  const response = await service.mutateAdGroupAds(request)

  for (const addedAdGroupAd of response.getResultsList()) {
    console.log(`Added an expanded text ad with resource name: '%s'`, addedAdGroupAd.getResourceName())
  }
}

main().catch(console.error)
