const { ClientSecretCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const credential = new ClientSecretCredential(process.env.AZURE_TENANT_ID, process.env.AZURE_APP_ID, process.env.AZURE_SECRET_ID);

const vaultName = process.env.AZURE_VAULTNAME //"kv-pl-devtest";
const url = `https://${vaultName}.vault.azure.net`;

const client = new SecretClient(url, credential);

var express = require('express');
var app = express();
var port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    let secretName = req.query.name
    if (secretName) {
        client.getSecret(secretName).then((keyResponse) => {
            res.send(secretName + ": " + keyResponse.value);
        }).catch((err) => {
            res.send(err.details.error.code);
        })
    } else {
        res.send('Please supply a secret');
    }
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})