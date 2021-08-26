const { DynamoDB } = require('aws-sdk');

const options = { region: 'eu-west-1' };

const testOptions = {
  endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
  region: 'local',
  sslEnabled: false
};

const db = new DynamoDB.DocumentClient(
  process.env.MOCK_DYNAMODB_ENDPOINT ? testOptions : options
);

module.exports = db;
