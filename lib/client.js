var request = require('superagent')
var qs = require('querystring')

function Client (options) {
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'https://www.googleapis.com/youtube/v3'
}

Client.prototype._request = function (path, params, callback) {
  var url = this.endpoint + path

  if (params) url = url + '?' + qs.encode(params) + '&key=' + this.options.key

  request
    .get(url)
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err || !res.ok) return callback('An error ocurred in the request ' + err)

      callback(null, res.body)
    })
}

Client.prototype.search = function (params, callback) {
  this._request('/search', params, callback)
}

module.exports = Client
