const CODES = [
  'ABC',
  'XYZ'
];

const tables = {
  prod: 'table-prod',
  qa: 'table-qa'
};

const removeFromDB = async (code) => {
  const TABLE_NAME = tables[env];

  // Scan using FilterExpression
  let params = {
    ExpressionAttributeValues: { ':field_name': code },
    FilterExpression: 'field_name = :field_name',
    TableName: TABLE_NAME
  };

  let items = [];
  let data = await db.scan(params).promise();
  items = [...items, ...data.Items];

  while (typeof data.LastEvaluatedKey != 'undefined') {
    params.ExclusiveStartKey = data.LastEvaluatedKey;

    data = await db.scan(params).promise();
    items = [...items, ...data.Items];
  }

  let leftItems = items.length;
  let group = [];
  let groupNumber = 0;

  console.log('Total items to be deleted', leftItems);

  for (const i of items) {
    const deleteReq = {
      DeleteRequest: {
        Key: {
          business: i.business, // RANGE KEY
          id: i.id // PRIMARY KEY
        }
      }
    };

    group.push(deleteReq);
    leftItems--;

    if (group.length === 25 || leftItems < 1) {
      groupNumber++;

      console.log(`Batch ${groupNumber} to be deleted.`);

      const deleteReqParams = {
        RequestItems: {
          [TABLE_NAME]: group
        }
      };

      await db.batchWrite(deleteReqParams).promise();

      console.log(`Batch ${groupNumber} processed. Left items: ${leftItems}`);

      // reset
      group = [];
    }
  }
};

const run = () => {
  return Promise.all(
    CODES.map(async (style_code) => removeFromDB(style_code))
  );
};

run();
