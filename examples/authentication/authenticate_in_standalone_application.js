'use strict'

require('dotenv').config()

const { OAuth2Client } = require('google-auth-library')
const inquirer = require('inquirer')

async function main () {
  const { clientId, clientSecret } = await inquirer.prompt([{
    type: 'input',
    name: 'clientId',
    message: 'Enter your OAuth2 client ID here:',
    default: process.env.CLIENT_ID
  }, {
    type: 'input',
    name: 'clientSecret',
    message: 'Enter your OAuth2 client secret here:',
    default: process.env.CLIENT_SECRET
  }])

  const redirectUri = 'urn:ietf:wg:oauth:2.0:oob'
  const scopes = ['https://www.googleapis.com/auth/adwords']
  const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri)
  const authUrl = oAuth2Client.generateAuthUrl({ scope: scopes })

  console.log(`Log into the Google account you use for Google Ads and visit the following URL:\n${authUrl}\n`)
  const { code } = await inquirer.prompt({
    type: 'input',
    name: 'code',
    message: 'After approving the application, enter the authorization code here:'
  })

  const { tokens } = await oAuth2Client.getToken(code)
  console.log(`Your refresh token is: ${tokens.refresh_token}\n`)
}

main().catch(console.error)
