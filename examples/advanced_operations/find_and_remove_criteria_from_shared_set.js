'use strict'

const {
  GoogleAdsClient,
  SearchGoogleAdsRequest,
  CriterionTypeEnum,
  SharedCriterionOperation,
  MutateSharedCriteriaRequest
} = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { CUSTOMER_ID, CAMPAIGN_ID } = require('../utils/argument_names')

const PAGE_SIZE = 1000

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
  const sharedSetIds = []
  const criterionResourceNames = []

  let service = googleAdsClient.getService('GoogleAdsService')

  let request = new SearchGoogleAdsRequest()

  request.setCustomerId(customerId)
  request.setQuery(`
    SELECT shared_set.id, shared_set.name
    FROM campaign_shared_set
    WHERE campaign.id = ${campaignId}
  `)
  request.setPageSize(PAGE_SIZE)

  let response = await service.search(request)

  for (const row of response.getResultsList()) {
    console.log(
      `Campaign shared set with ID %d and name '%s' was found.`,
      row.getSharedSet().getId().getValue(),
      row.getSharedSet().getName().getValue()
    )
    sharedSetIds.push(row.getSharedSet().getId().getValue())
  }

  // Next, retrieves shared criteria for all found shared sets.
  request.setQuery(`
    SELECT
      shared_criterion.type,
      shared_criterion.keyword.text,
      shared_criterion.keyword.match_type,
      shared_set.id
    FROM shared_criterion
    WHERE shared_set.id
    IN (${sharedSetIds.join(',')})
  `)

  response = await service.search(request)

  for (const row of response.getResultsList()) {
    const sharedCriterionResourceName = row.getSharedCriterion().getResourceName()
    if (row.getSharedCriterion().getType === CriterionTypeEnum.CriterionType.KEYWORD) {
      console.log(
        `Shared criterion with resource name '%s' for negative keyword with text '%s' and match type %d was found.`,
        sharedCriterionResourceName,
        row.getSharedCriterion().getKeyword().getText().getValue(),
        row.getSharedCriterion().getKeyword().getMatchType()
      )
    } else {
      console.log(`Shared criterion with resource name '%s' was found.`, sharedCriterionResourceName)
      criterionResourceNames.push(sharedCriterionResourceName)
    }
  }

  const sharedCriterionOperations = []
  for (const criterionResourceName of criterionResourceNames) {
    const sharedCriterionOperation = new SharedCriterionOperation()
    sharedCriterionOperation.setRemove(criterionResourceName)
    sharedCriterionOperations.push(sharedCriterionOperation)
  }

  service = googleAdsClient.getService('SharedCriterionService')

  request = new MutateSharedCriteriaRequest()
  request.setCustomerId(customerId)
  request.setOperationsList(sharedCriterionOperations)

  response = await service.mutateSharedCriteria(request)

  for (const removedSharedCriterion of response.getResultsList()) {
    console.log(`Removed shared criterion with resource name: '%s'.`, removedSharedCriterion.getResourceName())
  }
}

main().catch(console.error)
