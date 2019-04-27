'use strict'

require('dotenv').config()

const { OAuth2Client } = require('google-auth-library')
const http = require('http')
const url = require('url')
const opn = require('opn')
const destroyer = require('server-destroy')
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

  const redirectUri = 'http://localhost:3000/oauth2callback'
  const scopes = ['https://www.googleapis.com/auth/adwords']
  const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri)
  const authUrl = oAuth2Client.generateAuthUrl({ scope: scopes })

  console.log(`Log into the Google account you use for Google Ads and visit the following URL:\n${authUrl}\n`)
  const { tokens } = await authenticate(oAuth2Client, scopes)
  console.log(`Your refresh token is: ${tokens.refresh_token}\n`)
}

async function authenticate (oAuth2Client, scopes) {
  return new Promise((resolve, reject) => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    })
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:3000').searchParams
            res.end('Your refresh token has been fetched. Check the console output for further instructions.')
            server.destroy()
            const tokens = await oAuth2Client.getToken(qs.get('code'))
            resolve(tokens)
          }
        } catch (e) {
          reject(e)
        }
      })
      .listen(3000, () => {
        opn(authorizeUrl, { wait: false }).then(cp => cp.unref())
      })
    destroyer(server)
  })
}

main().catch(console.error)
