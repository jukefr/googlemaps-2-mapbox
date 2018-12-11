# googlemaps-2-mapbox

Convert Google Maps IDs to Mapbox IDs
Checks if the geometric coordinates (lat/lng) are within tolerated bounds (default is 0.5% tolerance).

## Usage

```bash
$ npm i -S googlemaps-2-mapbox
```

```javascript
const convert = require("googlemaps-2-mapbox");

const options = {
  google: process.env.GOOGLE_GEOCODING_API_KEY,
  mapbox: process.env.MAPBOX_API_KEY,
  tolerance: 3 // optionnal, default is 0.5%
};

const mapboxID = await convert(googleID, options);
```
