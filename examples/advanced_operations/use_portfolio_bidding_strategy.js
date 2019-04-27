'use strict'

const {
  GoogleAdsClient,
  BiddingStrategy,
  BiddingStrategyOperation,
  MutateBiddingStrategiesRequest,
  BudgetDeliveryMethodEnum,
  CampaignBudgetOperation,
  MutateCampaignBudgetsRequest,
  CampaignStatusEnum,
  AdvertisingChannelTypeEnum,
  CampaignOperation,
  MutateCampaignsRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, CAMPAIGN_BUDGET_ID } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, CAMPAIGN_BUDGET_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const campaignBudgetId = options.campaignBudgetId || null

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, campaignBudgetId)
}

 /**
  * Runs the example.
  *
  * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
  * @param {string} customerId - The client customer ID without hyphens.
  * @param {string} campaignBudgetId = The campaign budget ID.
  */
async function runExample (googleAdsClient, customerId, campaignBudgetId) {
  const biddingStrategyResourceName = await createBiddingStrategy(googleAdsClient, customerId)

  let campaignBudgetResourceName
  if (!campaignBudgetId) {
    campaignBudgetResourceName = await createSharedCampaignBudget(googleAdsClient, customerId)
  } else {
    campaignBudgetResourceName = `customers/${customerId}/campaignBudgets/${campaignBudgetId}` 
  }

  await createCampaignWithBiddingStrategy(googleAdsClient, customerId, biddingStrategyResourceName, campaignBudgetResourceName)
}

/**
 * Creates the portfolio bidding strategy.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The resource name of created bidding strategy.
 */
async function createBiddingStrategy (googleAdsClient, customerId) {
  const portfolioBiddingStrategy = {
    name: `Maximize Clicks #${Date.now()}`,
    target_spend: {
      cpc_bid_ceiling_micros: 2000000,
      target_spend_micros: 20000000
    }
  }

  const biddingStrategyOperation = new BiddingStrategyOperation()
  biddingStrategyOperation.setCreate(googleAdsClient.buildResource('BiddingStrategy', portfolioBiddingStrategy))

  const service = googleAdsClient.getService('BiddingStrategyService')

  const request = new MutateBiddingStrategiesRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([biddingStrategyOperation])

  const response = await service.mutateBiddingStrategies(request)

  const addedBiddingStrategy = response.getResultsList()[0]
  console.log(
    `Created portfolio bidding strategy with resource name: '%s'.`,
    addedBiddingStrategy.getResourceName()
  )

  return addedBiddingStrategy.getResourceName()
}

/**
 * Creates an explicitly shared budget to be used to create the campaign.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @return {string} The resource name of created shared budget.
 */
async function createSharedCampaignBudget (googleAdsClient, customerId) {
  const budget = {
    name: `Shared Interplanetary Budget #${Date.now()}`,
    delivery_method: BudgetDeliveryMethodEnum.BudgetDeliveryMethod.STANDARD,
    amount_micros: 50000000,
    explicitly_shared: true
  }

  const campaignBudgetOperation = new CampaignBudgetOperation()
  campaignBudgetOperation.setCreate(googleAdsClient.buildResource('CampaignBudget', budget))

  const service = googleAdsClient.getService('CampaignBudgetService')

  const request = new MutateCampaignBudgetsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([campaignBudgetOperation])

  const response = await service.mutateCampaignBudgets(request)

  const addedBudget = response.getResultsList()[0]
  console.log(`Created a shared budget with resource name '%s'.`, addedBudget.getResourceName())

  return addedBudget.getResourceName()
}

/**
 * Creates a campaign with the created portfolio bidding strategy.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} biddingStrategyResourceName - The bidding strategy resource name to use.
 * @param {string} campaignBudgetResourceName - The shared budget resource name to use.
 */
async function createCampaignWithBiddingStrategy (
  googleAdsClient,
  customerId,
  biddingStrategyResourceName,
  campaignBudgetResourceName
) {

  const campaign = {
    name: `Interplanetary Cruise #${Date.now()}`,
    advertising_channel_type: AdvertisingChannelTypeEnum.AdvertisingChannelType.SEARCH,
    status: CampaignStatusEnum.CampaignStatus.PAUSED,
    network_settings: {
      target_google_search: true,
      target_search_network: true,
      target_content_network: true
    },
    bidding_strategy: biddingStrategyResourceName,
    campaign_budget: campaignBudgetResourceName
  }

  const campaignOperation = new CampaignOperation()
  campaignOperation.setCreate(googleAdsClient.buildResource('Campaign', campaign))

  const service = googleAdsClient.getService('CampaignService')

  const request = new MutateCampaignsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([campaignOperation])

  const response = await service.mutateCampaigns(request)

  const addedCampaign = response.getResultsList()[0]
  console.log(`Created a campaign with resource name: '%s'.`, addedCampaign.getResourceName())
}

main().catch(console.error)
