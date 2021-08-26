function maxProductsExceeded(productsFound) {
  return process.env.MAX_PRODUCTS_TO_QUERY && productsFound > process.env.MAX_PRODUCTS_TO_QUERY;
}

const getBatchedItemsByBusiness = async (
  business,
  exclusiveStartKey,
  allData = []
) => {
  const data = await getByBusiness(business, exclusiveStartKey);
  if (data.Items.length > 0) {
    allData = [...allData, ...data['Items']];
  }

  if (data.LastEvaluatedKey && !maxProductsExceeded(allData.length)) {
    return getBatchedProductsByBusiness(
      business,
      data.LastEvaluatedKey,
      allData
    );
  } else {
    // If MAX_PRODUCTS_TO_QUERY is set only return MAX_PRODUCTS_TO_QUERY amount
    return process.env.MAX_PRODUCTS_TO_QUERY
      ? allData.slice(0, process.env.MAX_PRODUCTS_TO_QUERY)
      : allData;
  }
};