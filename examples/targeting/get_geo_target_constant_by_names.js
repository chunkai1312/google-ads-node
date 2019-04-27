'use strict'

const { GoogleAdsClient, SuggestGeoTargetConstantsRequest } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { LOCATION_NAMES, LOCALE, COUNTRY_CODE } = require('../utils/argument_names')

async function main () {
  const options = parseCommandArguments([LOCATION_NAMES, LOCALE, COUNTRY_CODE])

  const locationNames = options.locationNames || ['Paris', 'Quebec', 'Spain', 'Deutschland']
  const locale = options.locale || 'en'
  const countryCode = options.countryCode || 'FR'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, locationNames, locale, countryCode)
}

/**
 * Runs the example.
 * 
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string[]} locationNames - The list of location names to get suggested geo target constants.
 * @param {string} locale - The locale of the geo target constant to be retrieved.
 * @param {string} countryCode - The country code of the geo target constant to be retrieved.
 */
async function runExample (googleAdsClient, locationNames, locale, countryCode) {
  const service = googleAdsClient.getService('GeoTargetConstantService')

  const request = googleAdsClient.buildResource('SuggestGeoTargetConstantsRequest', {
    locale: locale,
    country_code: countryCode,
    location_names: {
      names: locationNames
    }
  })

  // request.setPageSize(1000)

  const response = await service.suggestGeoTargetConstants(request)

  for (const geoTargetConstantSuggestion of response.getGeoTargetConstantSuggestionsList()) {
    console.log(
      `Found '%s' ('%s','%s','%s',%s) in locale '%s' with reach %d for the search term '%s'.`,
      geoTargetConstantSuggestion.getGeoTargetConstant().getResourceName(),
      geoTargetConstantSuggestion.getGeoTargetConstant().getName().getValue(),
      geoTargetConstantSuggestion.getGeoTargetConstant().getCountryCode().getValue(),
      geoTargetConstantSuggestion.getGeoTargetConstant().getTargetType().getValue(),
      geoTargetConstantSuggestion.getGeoTargetConstant().getStatus(),
      geoTargetConstantSuggestion.getLocale().getValue(),
      geoTargetConstantSuggestion.getReach().getValue(),
      geoTargetConstantSuggestion.getSearchTerm().getValue()
    )
  }
}

main().catch(console.error)
