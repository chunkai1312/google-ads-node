'use strict'

const {
  GoogleAdsClient,
  SharedSetTypeEnum,
  SharedSetOperation,
  MutateSharedSetsRequest,
  KeywordMatchTypeEnum,
  SharedCriterionOperation,
  MutateSharedCriteriaRequest,
  CampaignSharedSetOperation,
  MutateCampaignSharedSetsRequest
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
 * @param {string} campaignId - The ID of the campaign.
 */
async function runExample (googleAdsClient, customerId, campaignId) {
  const sharedSet = {
    name: `API Negative keyword list - ${Date.now()}`,
    type: SharedSetTypeEnum.SharedSetType.NEGATIVE_KEYWORDS
  }

  const sharedSetOperation = new SharedSetOperation()
  sharedSetOperation.setCreate(googleAdsClient.buildResource('SharedSet', sharedSet))

  const sharedSetService = googleAdsClient.getService('SharedSetService')

  const mutateSharedSetsRequest = new MutateSharedSetsRequest()
  mutateSharedSetsRequest.setCustomerId(customerId)
  mutateSharedSetsRequest.setOperationsList([sharedSetOperation])

  const mutateSharedSetsResponse = await sharedSetService.mutateSharedSets(mutateSharedSetsRequest)

  const sharedSetResourceName = mutateSharedSetsResponse.getResultsList()[0].getResourceName()
  console.log(`Created shared set %s`, sharedSetResourceName)

  const sharedCriterionOperations = []
  const keywords = ['mars cruise', 'mars hotels']
  for (const keyword of keywords) {
    const sharedCriterion = {
      keyword: {
        text: keyword,
        match_type: KeywordMatchTypeEnum.KeywordMatchType.BROAD
      },
      shared_set: sharedSetResourceName
    }

    const sharedCriterionOperation = new SharedCriterionOperation()
    sharedCriterionOperation.setCreate(googleAdsClient.buildResource('SharedCriterion', sharedCriterion))
    sharedCriterionOperations.push(sharedCriterionOperation)
  }

  const sharedCriterionService = googleAdsClient.getService('SharedCriterionService')

  const mutateSharedCriteriaRequest = new MutateSharedCriteriaRequest()
  mutateSharedCriteriaRequest.setCustomerId(customerId)
  mutateSharedCriteriaRequest.setOperationsList(sharedCriterionOperations)

  const mutateSharedCriteriaResponse = await sharedCriterionService.mutateSharedCriteria(mutateSharedCriteriaRequest)
  console.log('Added %d shared criteria:', mutateSharedCriteriaResponse.getResultsList().length)
  
  for (const addedSharedCriterion of mutateSharedCriteriaResponse.getResultsList()) {
    console.log(addedSharedCriterion.getResourceName())
  }  

  const campaignSharedSet = {
    campaign: `customers/${customerId}/campaigns/${campaignId}`,
    shared_set: sharedSetResourceName
  }
  
  const campaignSharedSetOperation = new CampaignSharedSetOperation()
  campaignSharedSetOperation.setCreate(googleAdsClient.buildResource('CampaignSharedSet', campaignSharedSet))

  const campaignSharedSetService = googleAdsClient.getService('CampaignSharedSetService')

  const mutateCampaignSharedSetsRequest = new MutateCampaignSharedSetsRequest()
  mutateCampaignSharedSetsRequest.setCustomerId(customerId)
  mutateCampaignSharedSetsRequest.setOperationsList([campaignSharedSetOperation])

  const mutateCampaignSharedSetsResponse = await campaignSharedSetService.mutateCampaignSharedSets(mutateCampaignSharedSetsRequest)
  console.log(`Created campaign shared set: ${mutateCampaignSharedSetsResponse.getResultsList()[0].getResourceName()}`)
}

main().catch(console.error)
