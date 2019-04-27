'use strict'

const yargs = require('yargs')
const { ARGUMENTS_TO_DESCRIPTIONS } = require('./argument_names')

exports.parseCommandArguments = function parseCommandArguments (argumentNames) {
  const options = argumentNames.reduce((options, argumentName) => {
    options[argumentName] = { describe: ARGUMENTS_TO_DESCRIPTIONS[argumentName], type: 'string' }
    return options
  }, {})

  yargs
    .usage('Usage: $0 [options]')
    .options(options)
    .version(false)
    .help('h').alias('h', 'help')
    // .strict()

  return yargs.parse()
}