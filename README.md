# googlemaps-2-mapbox
convert google maps ID to mapbox ID

## Usage

```bash
$ npm i -S googlemaps-2-mapbox
```

```javascript
const Geoconverter = require('googlemaps-2-mapbox')
const converter = new Geocoverter({
    google: process.env.GOOGLE_GEOCODING_API_KEY,
    mapbox: process.env.MAPBOX_API_KEY
})

const id = converter.convert('XXXXXXXXX') // returns a Promise
```