const updateItem = ({
  TableName,
  id,
  counter,
}) => {
  const params = {
    TableName,
    Key: {
      id,
    },
    UpdateExpression: 'set counter = :c',
    ExpressionAttributeValues: {
      ':c': counter,
    },
  };

  return dbClient.update(params).catch((e) => JSON.stringify({ error: e }));
};