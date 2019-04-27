'use strict'

const { GoogleAdsClient, CampaignOperation, MutateCampaignsRequest } = require('google-ads-node')
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
 * @param {customerId} customerId - The client customer ID without hyphens.
 * @param {campaignId} campaignId - The ID of the campaign to remove.
 */
async function runExample (googleAdsClient, customerId, campaignId) {
  const campaignResourceName = `customers/${customerId}/campaigns/${campaignId}`
  const campaignOperation = new CampaignOperation()
  campaignOperation.setRemove(campaignResourceName)

  const service = googleAdsClient.getService('CampaignService')

  const request = new MutateCampaignsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([campaignOperation])

  const response = await service.mutateCampaigns(request)
  const removedCampaign = response.getResultsList()[0]
  console.log(`Removed campaign with resource name: '%s'`, removedCampaign.getResourceName())
}

main().catch(console.error)
