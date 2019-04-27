'use strict'

const { GoogleAdsClient, ListAccessibleCustomersRequest } = require('google-ads-node')

async function main () {
  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 */
async function runExample (googleAdsClient) {
  const service = googleAdsClient.getService('CustomerService')
  const request = new ListAccessibleCustomersRequest()
  const response = await service.listAccessibleCustomers(request)

  console.log(`Total results: %d`, response.getResourceNamesList().length)

  for (const customerResourceName of response.getResourceNamesList()) {
    console.log(`Customer resource name: '%s'`, customerResourceName)    
  }
}

main().catch(console.error)
