# googlemaps-2-mapbox

### Buy me covfefe ❤️
```
BTC     bc1qjqzkrfupcrgtzpeu0pmut24vq8tfzs9rqe6458
ETH     0x799b3b5520525CDd95d1D5C7Ba1a2Ee6037B1bFE
ADA     addr1q8mz3z7cw4jz9dacvpz6dpw2c6xke6nv8vk6rfnt7mkaat8vgnu796g5vrarn4pjgpdqkare9zryx645e25wcae8636q97typg
XRP     r3Bpcyp8zVNkaDzpppdRTuSXSvxAUJXAVj
LTC     ltc1qpja2nr6x9nz3q3ya3ec6ec5hxvm8dz52urn39z
BCH     1NAteBJF7wKw8BdzLJ6YE65ja1ZAHf68jf
DOGE    DL4VNBx6EGuPcgnJrfgxok9tTvcbVGKx3R
XMR     89S6qYdMJyZZ8ddKtFqTzGhuDZxJkNcmL9L6KzTSw7AeQos1uku2GBhBaHLUYtgv4TQRRQuNF4FixAu6geKC2r25NyWZj2Q
DASH    XtffD9gZFDKWWpabMyAi8sF9EeDREH5dUy
DCR     DsSAqeDekTCvbd84GkAofHyutrFrFDX1EnD
ZEC     t1P336iRRMM6Yu2wTzXJmjm6p4RgNAQkgsM
STRAX   SVfFcCZtQ8yMSMxc2K8xzFr4psHpGpnKNT 
```

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
