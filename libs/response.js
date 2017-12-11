exports.isValid = function isValid(res, statusCode, expectedType) {
  const contentType = res.headers['content-type']
  contentTypeRE = new RegExp('^' + expectedType)

  if (!statusCode) {
    return new Error('Request Failed.\n' +
                      `Status Code: ${res.statusCode}`)
  } else if (!contentTypeRE.test(contentType)) {
    return new Error('Invalid content-type.\n' +
                     `Expected ${expectedType} but received ${contentType}`)
  }
}
