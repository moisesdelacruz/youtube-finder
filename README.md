# youtube-finder

A isomorphic client for connect YOUTUBE API with an application javascript.

## Install
```sh
$ npm install youtube-finder
```

## Usage
``` js
var youtube = require('youtube-finder')
var client = youtube.createClient({ key: 'YOUR_API_KEY'})
```

## Search
``` js
var params = {
  part: 'snippet',
  q: 'Still into You paramore',
  maxResults: 5
}
client.search(params, function (err, data) {
  // your magic..
})
```

### Mandatory parameters
``` json
part
    The part names that can be included in the parameter value are:
        - snippet
        - id
```
## filters and additional parameters

``` json
* maxResults
    Acceptable values are {0/} a 50, both inclusive. The default is 5.

* q
    The parameter q specifies the query term to be searched

* type
    The acceptable values are:
        * channel
        * playlist
        * video
    default value is: video,channel,playlist

* videoDuration
    Acceptable values are:
        * any: do not filter search results videos by duration. This is the default value.
        * long: Include only videos more than 20 minutes.
        * medium: Include only videos between 4 and 20 minutes (inclusive) in length.
        * short: Include only videos of less than 4 minutes.

more info at website official: https://developers.google.com/youtube/v3/docs/search/list#parmetros
```

## License MIT

Copyright (c) 2016 - Moises De La Cruz
