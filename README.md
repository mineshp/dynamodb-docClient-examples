# Example DynamoDB DocumentClient calls

This repo shares example of calls to dynamodb using DocumentClient.

See [notes](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)

## Examples

### Batch Delete Multiple Items: examples/batchDeleteItems.js

Batch delete requires batches to be sent with a maximum of 25 items per batch.

This script scans a table with a filter expression, find value in field and return all rows. It then paginates and builds batches of 25 to DeleteRequest.

### Update Item: examples/updateItem.js

This script updates a field in the table

### Query Last 10 Items: examples/queryLast10Items.js

This script queries the table

- sorts the results by date desc
- returns the last 10 items

### Query Items and Paginate: examples/getBatchedItems.js

This script queries items and batches them up if the total number of scanned items exceeds the maximum data set size limit of 1 MB, the scan stops and results are returned to the user as a LastEvaluatedKey value to continue the scan in a subsequent operation.
