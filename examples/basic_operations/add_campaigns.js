'use strict'

const {
  GoogleAdsClient,
  AdvertisingChannelTypeEnum,
  BudgetDeliveryMethodEnum,
  CampaignStatusEnum,
  CampaignBudgetOperation,
  CampaignOperation,
  MutateCampaignsRequest,
  MutateCampaignBudgetsRequest
} = require('google-ads-node')
const moment = require('moment')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID } = require('../utils/argument_names')

const NUMBER_OF_CAMPAIGNS_TO_ADD = 2

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId)
}

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 */
async function runExample (googleAdsClient, customerId) {
  const budgetResourceName = await addCampaignBudget(googleAdsClient, customerId)

  const campaignOperations = []
  for (let i = 0; i < NUMBER_OF_CAMPAIGNS_TO_ADD; i++) {
    const campaign = googleAdsClient.buildResource('Campaign', {
      name: `Interplanetary Cruise #${Date.now()}`,
      advertising_channel_type: AdvertisingChannelTypeEnum.AdvertisingChannelType.SEARCH,
      status: CampaignStatusEnum.CampaignStatus.ENABLED,
      manual_cpc: { enhanced_cpc_enabled: true },
      campaign_budget: budgetResourceName,
      network_settings: {
        target_google_search: true,
        target_search_network: true,
        target_content_network: false,
        target_partner_search_network: false
      },
      start_date: moment().add(1, 'days').format('YYYYMMDD'),
      end_date: moment().add(1, 'months').format('YYYYMMDD')
    })

    const campaignOperation = new CampaignOperation()
    campaignOperation.setCreate(campaign)
    campaignOperations.push(campaignOperation)
  }

  const service = googleAdsClient.getService('CampaignService')

  const request = new MutateCampaignsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList(campaignOperations)

  const response = await service.mutateCampaigns(request)

  console.log('Added %d campaigns:', response.getResultsList().length)

  for (const addedCampaign of response.getResultsList()) {
    console.log(addedCampaign.getResourceName())
  }
}

/**
 * Creates a new campaign budget in the specified client account.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @return {string} The resource name of the newly created budget.
 */
async function addCampaignBudget (googleAdsClient, customerId) {
  const budget = googleAdsClient.buildResource('CampaignBudget', {
    name: `Interplanetary Cruise Budget #${Date.now()}`,
    delivery_method: BudgetDeliveryMethodEnum.BudgetDeliveryMethod.STANDARD,
    amount_micros: 500000
  })

  const campaignBudgetOperation = new CampaignBudgetOperation()
  campaignBudgetOperation.setCreate(budget)

  const service = googleAdsClient.getService('CampaignBudgetService')

  const request = new MutateCampaignBudgetsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([campaignBudgetOperation])

  const response = await service.mutateCampaignBudgets(request)

  const addedBudget = response.getResultsList()[0]

  console.log(`Added budget named '%s'`, addedBudget.getResourceName())

  return addedBudget.getResourceName()
}

main().catch(console.error)
