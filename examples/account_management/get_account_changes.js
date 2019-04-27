'use strict'

const { GoogleAdsClient, SearchGoogleAdsRequest, ChangeStatusResourceTypeEnum } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID } = require('../utils/argument_names')

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
async function runExample(googleAdsClient, customerId) {
  const service = googleAdsClient.getService('GoogleAdsService')

  const request = new SearchGoogleAdsRequest()
  request.setCustomerId(customerId)
  request.setQuery(`
    SELECT
      change_status.resource_name,
      change_status.last_change_date_time,
      change_status.resource_type,
      change_status.campaign,
      change_status.ad_group,
      change_status.resource_status,
      change_status.ad_group_ad,
      change_status.ad_group_criterion,
      change_status.campaign_criterion
    FROM change_status
    WHERE change_status.last_change_date_time DURING LAST_7_DAYS
    ORDER BY change_status.last_change_date_time
  `)
  request.setPageSize(1000)

  const response = await service.search(request)

  for (const row of response.getResultsList()) {
    console.log(
      `On %s, change status '%s' shows resource '%s' with type %d and status %d.`,
      row.getChangeStatus().getLastChangeDateTime().getValue(),
      row.getChangeStatus().getResourceName(),
      getResourceNameForResourceType(row.getChangeStatus()),
      row.getChangeStatus().getResourceType(),
      row.getChangeStatus().getResourceStatus()
    )
  }
}

/**
 * Gets the resource name for the resource type of the change status object.
 * 
 * Each returned row contains all possible changed resources, only one of which is populated
 * with the name of the changed resource. This function returns the resource name of the
 * changed resource based on the resource type.
 * 
 * @param {ChangeStatus} changeStatus - the change status object for getting changed resource.
 * @return {string} The name of the resource that changed.
 */
function getResourceNameForResourceType (changeStatus) {
  let resourceName = ''

  switch (changeStatus.getResourceType()) {
    case ChangeStatusResourceTypeEnum.ChangeStatusResourceType.AD_GROUP:
      resourceName = changeStatus.getAdGroup().getValue()
      break
    case ChangeStatusResourceTypeEnum.ChangeStatusResourceType.AD_GROUP_AD:
      resourceName = changeStatus.getAdGroupAd().getValue()
      break
    case ChangeStatusResourceTypeEnum.ChangeStatusResourceType.AD_GROUP_CRITERION:
      resourceName = changeStatus.getAdGroup().getValue()
      break
    case ChangeStatusResourceTypeEnum.ChangeStatusResourceType.CAMPAIGN:
      resourceName = changeStatus.getCampaign().getValue()
      break
    case ChangeStatusResourceTypeEnum.ChangeStatusResourceType.CAMPAIGN_CRITERION:
      resourceName = changeStatus.getCampaignCriterion().getValue()
      break
  }

  return resourceName
}

main().catch(console.error)
