var test = require('tape')
var nock = require('nock')
var youtube = require('../')
var Client = require('../lib/client')

var endpoint = 'https://www.googleapis.test'
var key = 'gDFV97HRNaFmP9ZqQ'

test('should crete a client', function (t) {
  t.ok(youtube.createClient, 'should exist')
  t.equals(typeof youtube.createClient, 'function', 'should be a function')

  var client = youtube.createClient()
  t.ok(client instanceof Client, 'should be instance of Client')
  t.end()
})

test('should fail with unknown endpoint', function (t) {
  var client = youtube.createClient({ endpoint, key })
  nock(endpoint)
    .get('/foo')
    .reply(404)

  client._request('/foo', {part: 'snippet', q: 'Avril Lavigne'}, function (err, body) {
    t.ok(err, 'request faild')
    t.end()
  })
})

test('should search advanced', function (t) {
  var client = youtube.createClient({ endpoint, key })
  t.equals(typeof client.search, 'function', 'should be a function')

  nock(endpoint)
    .get('/search')
    .query({ part: 'snippet' })
    .query({ q: 'Avril Lavigne' })
    .query({ maxResults: 5 })
    .query({ key: key })
    .reply(200, [{ kind: 'AvrilLavigneVevo' },
                  { etag: 'AvrilLavigneVevo' },
                  { nextPageToken: 'AvrilLavigneVevo' },
                  { regionCode: 'AvrilLavigneVevo' },
                  { pageInfo: 'AvrilLavigneVevo' },
                  { items: 'AvrilLavigneVevo' }])

  client.search({ part: 'snippet', q: 'Avril Lavigne', maxResults: 5 }, function (err, data) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(data), 'should be an Array')
    t.end()
  })
})
