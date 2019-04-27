'use strict'

const { GoogleAdsClient, SearchGoogleAdsFieldsRequest } = require('google-ads-node')
const { parseCommandArguments } = require('../utils/argument_parser')
const { ARTIFACT_NAME } = require('../utils/argument_names')

const PAGE_SIZE = 1000

async function main () {
  const options = parseCommandArguments([ARTIFACT_NAME])

  const artifactName = options.artifactName || 'INSERT_ARTIFACT_NAME_HERE'

  const googleAdsClient = new GoogleAdsClient()

  await runExample(googleAdsClient, options.artifactName)
}

/**
 * Runs the example.
 *
 * @param {GoogleAdsClient} googleAdsClient - The Google Ads API client.
 * @param {string} artifactName - The name of artifact to get its metadata.
 */
async function runExample (googleAdsClient, artifactName) {
  const service = googleAdsClient.getService('GoogleAdsFieldService')

  const request = new SearchGoogleAdsFieldsRequest()
  request.setQuery(`
    SELECT
      name,
      category,
      selectable,
      filterable,
      sortable,
      selectable_with,
      data_type,
      is_repeated
    WHERE name = '${artifactName}'
  `)
  request.setPageSize(PAGE_SIZE)

  const results = await service.searchGoogleAdsFields(request)
  
  for (const field of results.getResultsList()) {
    console.log(
      `An artifact named '%s' with category %d and data type %d %s selectable, %s filterable, %s sortable and %s repeated.`,
      field.getName().getValue(),
      field.getCategory(),
      field.getDataType(),
      getIsOrIsNot(field.getSelectable()),
      getIsOrIsNot(field.getFilterable()),
      getIsOrIsNot(field.getSortable()),
      getIsOrIsNot(field.getIsRepeated())
    )
    if (field.getSelectableWithList().length > 0) {
      const selectableArtifacts = []
      for (const wrappedSelectableArtifact of field.getSelectableWithList()) {
        selectableArtifacts.push(wrappedSelectableArtifact.getValue())
      }
      console.log('\nThe artifact can be selected with the following artifacts:')
      for (const selectableArtifact of selectableArtifacts) {
        console.log(selectableArtifact)
      }
    }
  }
}

/**
 * Returns 'is' when the provided boolean value is true or 'is not' when it's false.
 * 
 * @param {BoolValue} boolValue - The boolean value.
 */
function getIsOrIsNot (boolValue) {
  return boolValue.getValue() ? 'is' : 'is not'
}

main().catch(console.error)
