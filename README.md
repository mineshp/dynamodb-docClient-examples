# Example DynamoDB DocumentClient calls

This repo shares example of calls to dynamodb using DocumentClient.

See [notes](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)

## Examples

### Batch delete multiple items

Batch delete requires batches to be sent with a maximum of 25 items per batch.

#### script: examples/batchDeleteItems.js

This script scans a table with a filter expression, find value in field and return all rows. It then paginates and builds batches of 25.
