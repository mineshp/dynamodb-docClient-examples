const getLast10 = async (code) =>
  query({
    TableName: TABLE_NAME,
    KeyConditionExpression: "code = :code",
    ExpressionAttributeValues: {
      ":code": code,
    },
    ScanIndexForward: false, // Sort by date (range key) desc
    Limit: 10, // Return last 10 items
  });