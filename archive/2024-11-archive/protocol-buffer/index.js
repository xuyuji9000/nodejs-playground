var search = require('./search_pb')

var request = new search.SearchRequest()
request.setQuery('test')
request.setPageNumber(2)
request.setResultPerPage(10)

var bytes = request.serializeBinary()
var request2 = search.SearchRequest.deserializeBinary(bytes)
console.log(request2.getQuery())
