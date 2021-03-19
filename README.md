# googlemaps-2-mapbox

Convert Google Maps IDs to Mapbox IDs :
**GOOGLE ID => LAT/LNG => MAPBOX ID** (Most precise way to do it)

## Usage

```bash
$ npm i -S googlemaps-2-mapbox
```

```javascript
const convert = require("googlemaps-2-mapbox");

const googleID = 'XXXXX'

const options = {
  google: process.env.GOOGLE_GEOCODING_API_KEY,
  mapbox: process.env.MAPBOX_API_KEY,
};

const mapboxID = await convert(googleID, options);
```

## Information
This package is written in typescript but also pushed to npm as a built javascript. It is compatible both with Typescript and Javascript.
