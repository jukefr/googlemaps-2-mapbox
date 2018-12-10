/**
 * Converts a Google Place ID to a Mapbox ID
 * 
 * const geoconverter = new Geoconverter({google: 'xxx', mapbox: 'xxx'})
 * const newId = await geoconverter.convert('XXXXXXXX')
 */
module.exports = class Geoconverter {
    constructor(options) {
        this.options = options
        this.init()
    }

    init() {
        this.googleClient = require('@google/maps').createClient({
            key: this.options.google,
            Promise: Promise
          });
        this.mapboxClient = require('@mapbox/mapbox-sdk/services/geocoding')({ accessToken: this.options.mapbox })
    }

    googleAddress(id) {
        return this.googleClient.reverseGeocode({place_id: id}).asPromise()
    }

    mapboxId(address) {
        return this.mapboxClient.forwardGeocode({
            query: address,
            limit: 1
          })
          .send()
    }

    convert(id) {
        return this.googleAddress(id)
            .then(address => this.mapboxId(address.json.results[0].formatted_address))
            .then(id => id.body.features[0].id)
    }
}