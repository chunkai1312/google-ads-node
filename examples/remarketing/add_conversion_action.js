'use strict'

const {
  GoogleAdsClient,
  ConversionActionCategoryEnum,
  ConversionActionTypeEnum,
  ConversionActionStatusEnum,
  ConversionActionOperation,
  MutateConversionActionsRequest
} = require('google-ads-node')
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
async function runExample (googleAdsClient, customerId) {
  const conversionAction = {
    name: `Earth to Mars Cruises Conversion #${Date.now()}`,
    category: ConversionActionCategoryEnum.ConversionActionCategory.DEFAULT,
    type: ConversionActionTypeEnum.ConversionActionType.WEBPAGE,
    status: ConversionActionStatusEnum.ConversionActionStatus.ENABLED,
    view_through_lookback_window_days: 15,
    value_settings: {
      default_value: 23.41,
      always_use_default_value: true
    }
  }

  const conversionActionOperation = new ConversionActionOperation()
  conversionActionOperation.setCreate(googleAdsClient.buildResource('ConversionAction', conversionAction))

  const service = googleAdsClient.getService('ConversionActionService')

  const request = new MutateConversionActionsRequest()
  request.setCustomerId(customerId)
  request.setOperationsList([conversionActionOperation])

  const response = await service.mutateConversionActions(request)

  console.log(`Added %d conversion actions:%s`, response.getResultsList().length)

  for (const addedConversionAction of response.getResultsList()) {
    console.log(`New conversion action added with resource name: '%s'`, addedConversionAction.getResourceName())
  }
}

main().catch(console.error)
