'use strict'

const { GoogleAdsClient, CampaignStatusEnum, CampaignOperation, MutateCampaignsRequest } = require('google-ads-node')
const { getFieldMask } = require('google-ads-node/build/lib/utils')
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
 * @param {string} campaignId - The ID of campaign to update.
 */
async function runExample (googleAdsClient, customerId, campaignId) {
  const campaign = {
    resource_name: `customers/${customerId}/campaigns/${campaignId}`,
    status: CampaignStatusEnum.CampaignStatus.PAUSED
  }

  const campaignOperation = new CampaignOperation()
  campaignOperation.setUpdate(googleAdsClient.buildResource('Campaign', campaign))
  campaignOperation.setUpdateMask(getFieldMask(campaign))

  const service = googleAdsClient.getService('CampaignService')

  const request = new MutateCampaignsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([campaignOperation])

  const response = await service.mutateCampaigns(request)
  const updatedCampaign = response.getResultsList()[0]
  console.log(`Updated campaign with resource name: '%s'`, updatedCampaign.getResourceName())
}

main().catch(console.error)
