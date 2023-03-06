// var KeyVault = require('azure-keyvault');
// var AuthenticationContext = require('adal-node').AuthenticationContext;

// var clientId = process.env.AZURE_APP_ID;
// var clientSecret = process.env.AZURE_SECRET_ID;
// var vaultUri = "https://kv-pl-devtest.vault.azure.net/";

// // Authenticator - retrieves the access token
// var authenticator = function(challenge, callback) {

//     // Create a new authentication context.
//     var context = new AuthenticationContext(challenge.authorization);

//     // Use the context to acquire an authentication token.
//     return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, function(err, tokenResponse) {
//         if (err) throw err;
//         // Calculate the value to be set in the request's Authorization header and resume the call.
//         var authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;

//         return callback(null, authorizationValue);
//     });

// };

// var credentials = new KeyVault.KeyVaultCredentials(authenticator);
// var client = new KeyVault.KeyVaultClient(credentials);


// // let secretName = 'mysecret',
// //     value = 'myValue',
// //     optionsopt = {
// //         contentType: 'sometype',
// //         // tags: 'sometag',
// //         // secretAttributes: 'someAttributes',
// //         // contentType: 'sometype',
// //         // customHeaders: 'customHeaders'
// //     };
// // client.setSecret(vaultUri, secretName, value, optionsopt).then((results) => {
// //     console.log(results);
// // })

// let secretName = 'Developer'
// secretVersion = '' //leave this blank to get the latest version;
// client.getSecret(vaultUri, secretName, secretVersion).then((result) => {
//     console.log(result);
// })

const { ClientSecretCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const credential = new ClientSecretCredential("d9827387-7284-4ccc-b1a6-657f7d2ab26a", process.env.AZURE_APP_ID, process.env.AZURE_SECRET_ID);

const vaultName = "kv-pl-devtest";
const url = `https://${vaultName}.vault.azure.net`;

const client2 = new SecretClient(url, credential);

const secretName2 = "Developer";

client2.getSecret(secretName2).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log("error", err);
})