'use strict'

const {
  GoogleAdsClient,
  InteractionTypeEnum,
  CampaignBidModifierOperation,
  MutateCampaignBidModifiersRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, CAMPAIGN_ID, BID_MODIFIER_VALUE } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, CAMPAIGN_ID, BID_MODIFIER_VALUE])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const campaignId = options.campaignId || 'INSERT_CAMPAIGN_ID_HERE'
  const bidModifierValue = options.bidModifierValue || 'INSERT_BID_MODIFIER_VALUE_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, campaignId, Number(bidModifierValue))
}

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} campaignId - The ID of the campaign where the bid modifier will be added.
 * @param {number} bidModifierValue - The value of the bid modifier to add.
 */
async function runExample (googleAdsClient, customerId, campaignId, bidModifierValue) {
  const campaignResourceName = `customers/${customerId}/campaigns/${campaignId}`

  const campaignBidModifier = {
    campaign: campaignResourceName,
    bid_modifier: bidModifierValue,
    interaction_type: { type: InteractionTypeEnum.InteractionType.CALLS }
  }

  const campaignBidModifierOperation = new CampaignBidModifierOperation()
  campaignBidModifierOperation.setCreate(googleAdsClient.buildResource('CampaignBidModifier', campaignBidModifier))

  const service = googleAdsClient.getService('CampaignBidModifierService')

  const request = new MutateCampaignBidModifiersRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([campaignBidModifierOperation])

  const response = await service.mutateCampaignBidModifiers(request)

  console.log('Added %d campaign bid modifier:', response.getResultsList().length)

  for (const addedCampaignBidModifier of response.getResultsList()) {
    console.log(addedCampaignBidModifier.getResourceName())
  }
}

main().catch(console.error)
