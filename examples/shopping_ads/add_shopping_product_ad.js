'use strict'

const {
  GoogleAdsClient,
  BudgetDeliveryMethodEnum,
  CampaignBudgetOperation,
  MutateCampaignBudgetsRequest,
  AdvertisingChannelTypeEnum,
  CampaignOperation,
  MutateCampaignsRequest,
  AdGroupStatusEnum,
  AdGroupTypeEnum,
  AdGroupOperation,
  MutateAdGroupsRequest,
  Ad,
  ShoppingProductAdInfo,
  AdGroupAd,
  AdGroupAdStatusEnum,
  AdGroupAdOperation,
  MutateAdGroupAdsRequest,
  ListingGroupTypeEnum,
  AdGroupCriterionOperation,
  MutateAdGroupCriteriaRequest,
  CampaignStatusEnum,
  ManualCpc
} = require('google-ads-node')

const { CUSTOMER_ID, MERCHANT_CENTER_ACCOUNT_ID, SHOULD_CREATE_DEFAULT_LISTING_GROUP } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([CUSTOMER_ID, MERCHANT_CENTER_ACCOUNT_ID, SHOULD_CREATE_DEFAULT_LISTING_GROUP])

  const customerId = options.customerId || 'INSERT_CUSTOMER_ID_HERE'
  const merchantCenterAccountId = options.merchantCenterAccountId || 'INSERT_MERCHANT_CENTER_ACCOUNT_ID_HERE'
  const shouldCreateDefaultListingGroup = options.shouldCreateDefaultListingGroup || 'INSERT_BOOLEAN_TRUE_OR_FALSE_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, customerId, recommendationId)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID without hyphens.
 * @param {string} merchantCenterAccountId - The Merchant Center account ID.
 * @param {boolean} shouldCreateDefaultListingGroup
 */
async function runExample (googleAdsClient, customerId, merchantCenterAccountId, shouldCreateDefaultListingGroup) {
  const budgetResourceName = await addCampaignBudget(googleAdsClient, customerId)

  const campaignResourceName = await addStandardShoppingCampaign(googleAdsClient, customerId, budgetResourceName, merchantCenterAccountId)

  const adGroupResourceName = await addShoppingProductAdGroup(googleAdsClient, customerId, campaignResourceName)

  // await addShoppingProductAdGroupAd(googleAdsClient, customerId, adGroupResourceName)

  // if (shouldCreateDefaultListingGroup) {
  //   await addDefaultShoppingListingGroup(googleAdsClient, customerId, adGroupResourceName)
  // }
}

/**
 * Creates a new campaign budget in the specified client account.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID.
 * @return {string} The resource name of the newly created budget.
 */
async function addCampaignBudget (googleAdsClient, customerId) {
  const budget = {
    name: `Interplanetary Cruise Budget #${Date.now()}`,
    delivery_method: BudgetDeliveryMethodEnum.BudgetDeliveryMethod.STANDARD,
    amount_micros: 50000000
  }

  const campaignBudgetOperation = new CampaignBudgetOperation()
  campaignBudgetOperation.setCreate(client.buildResource('CampaignBudget', budget))

  const service = googleAdsClient.getService('CampaignBudgetService')

  const request = new MutateCampaignBudgetsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([campaignBudgetOperation])

  const response = await service.mutateCampaignBudgets(request)

  const addedBudget = response.getResultsList()[0]

  console.log(`Added a budget with resource name '%s'.`, addedBudget.getResourceName())

  return addedBudget.getResourceName()
}

/**
 * Creates a new shopping product campaign in the specified client account.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID.
 * @param {string} budgetResourceName - The resource name of budget for a new campaign.
 * @param {string} merchantCenterAccountId - The Merchant Center account ID.
 * @return {string} The resource name of the newly created campaign.
 */
async function addStandardShoppingCampaign (googleAdsClient, customerId, budgetResourceName, merchantCenterAccountId) {
  const campaign = {
    name: `Interplanetary Cruise Campaign #${Date.now()}`,
    shopping_setting: {
      sales_country: 'US',
      campaign_priority: 0,
      merchant_id: merchantCenterAccountId,
      enable_local: true
    },
    campaign_budget: budgetResourceName
  }

  const pb = client.buildResource('Campaign', campaign)
  pb.setAdvertisingChannelType(AdvertisingChannelTypeEnum.AdvertisingChannelType.SHOPPING)
  pb.setStatus(CampaignStatusEnum.CampaignStatus.PAUSED)

  const cpc = new ManualCpc()
  // cpc.setEnhancedCpcEnabled([true])
  pb.setManualCpc(cpc)

  const campaignOperation = new CampaignOperation()
  campaignOperation.setCreate(pb)

  const service = googleAdsClient.getService('CampaignService')

  const request = new MutateCampaignsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([campaignOperation])

  const response = await service.mutateCampaigns(request)

  // const addedCampaign = response.getResultsList()[0]

  // console.log(`Added a standard shopping campaign with resource name '%s'.`, addedCampaign.getResourceName())

  // return addedCampaign.getResourceName()
}

/**
 * Creates a new shopping product ad group in the specified campaign.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID.
 * @param {string} campaignResourceName - The resource name of campaign that a new ad group will belong to.
 * @return {string} The resource name of the newly created ad group.
 */
async function addShoppingProductAdGroup (googleAdsClient, customerId, campaignResourceName) {
  const adGroup = googleAdsClient.buildResource('AdGroup', {
    name: `Earth to Mars Cruise #${Date.now()}`,
    campaign: campaignResourceName,
    type: AdGroupTypeEnum.AdGroupType.SHOPPING_PRODUCT_ADS,
    cpc_bid_micros: 10000000,
    status: AdGroupStatusEnum.AdGroupStatus.ENABLED,
  }) 

  const adGroupOperation = new AdGroupOperation()
  adGroupOperation.setCreate(adGroup)

  const service = googleAdsClient.getService('AdGroupService')

  const request = new MutateAdGroupsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupOperation])

  const response = await service.mutateAdGroups(request)

  const addedAdGroup = response.getResultsList()[0]

  console.log(`Added a shopping product ad group with resource name '%s'.`, addedAdGroup.getResourceName())

  return addedAdGroup.getResourceName()
}

/**
 * Creates a new shopping product ad group ad in the specified ad group.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID.
 * @param {string} adGroupResourceName - The resource name of ad group that a new ad group ad will belong to.
 */
async function addShoppingProductAdGroupAd (googleAdsClient, customerId, adGroupResourceName) {
  const ad = new Ad()
  ad.setShoppingProductAd(new ShoppingProductAdInfo())

  const adGroupAd = googleAdsClient.buildResource('AdGroupAd', {
    ad_group: adGroupResourceName
  })
  adGroupAd.setAd(ad)
  adGroupAd.setStatus(AdGroupAdStatusEnum.AdGroupAdStatus.PAUSED)

  const adGroupAdOperation = new AdGroupAdOperation()
  adGroupAdOperation.setCreate(adGroupAd)

  const service = googleAdsClient.getService('AdGroupAdService')

  const request = new MutateAdGroupAdsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupAdOperation])

  const response = await service.mutateAdGroupAds(request)
  const addedAdGroupAd = response.getResultsList()[0]

  console.log(`Added a shopping product ad group ad with resource name '%s'.`, addedAdGroupAd.getResourceName())
}

/**
 * Creates a new default shopping listing group for the specified ad group. A listing group is
 * the Google Ads API representation of a "product group" described in the Google Ads user
 * interface. The listing group will be added to the ad group using an "ad group criterion".
 * The criterion will contain the bid for a given listing group.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} customerId - The client customer ID.
 * @param {string} adGroupResourceName - The resource name of ad group that the new listing group will belong to.
 */
async function addDefaultShoppingListingGroup (googleAdsClient, customerId, adGroupResourceName) {
  const adGroupCriterion = {
    ad_group: adGroupResourceName,
    // status: AdGroupCriterionStatusEnum.AdGroupCriterionStatus.ENABLED,
    listing_group: {
      type: ListingGroupTypeEnum.ListingGroupType.UNIT
    },
    cpc_bid_micros: 500000
  }
  
  const pb = client.buildResource('AdGroupCriterion', adGroupCriterion)
  pb.setStatus(AdGroupCriterionStatusEnum.AdGroupCriterionStatus.ENABLED)

  const adGroupCriterionOperation = new AdGroupCriterionOperation()
  adGroupCriterionOperation.setCreate(adGroupCriterion)

  const service = googleAdsClient.getService('AdGroupCriterionService')

  const request = new MutateAdGroupCriteriaRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([adGroupCriterionOperation])

  const response = await service.mutateAdGroupCriteria(request)

  const addedAdGroupCriterion = response.getResultsList()[0]
  console.log(
    `Added an ad group criterion containing a listing group with resource name: '%s'.`,
    addedAdGroupCriterion.getResourceName()
  )
}

main().catch(console.error)
