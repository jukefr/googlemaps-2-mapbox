/**
 * Converts a Google Place ID to a Mapbox ID and check if geometry matches (default 0.5% tolerance)
 *
 * const id = convert('google-maps-id', {google: 'apikey', mapbox: 'apikey', tolerance: 1} )
 */
module.exports = (
  id = "",
  { google = "", mapbox = "", tolerance = 0.5 } = {}
) => {
  /**
   * Creates API clients
   */
  const init = () => {
    this.googleClient = require("@google/maps").createClient({
      key: google,
      Promise: Promise
    });
    this.mapboxClient = require("@mapbox/mapbox-sdk/services/geocoding")({
      accessToken: mapbox
    });
  };

  /**
   * Google ID to Address
   * @param {*} id
   */
  const googleAddress = id => {
    return this.googleClient.reverseGeocode({ place_id: id }).asPromise();
  };

  /**
   * Address to Mapbox ID
   * Check if geometric position is within tolerance (default is 0.5%)
   * @param {*} address
   */
  const mapboxId = ({ formatted_address, geometry }) => {
    return this.mapboxClient
      .forwardGeocode({
        query: formatted_address,
        limit: 1
      })
      .send()
      .then(response => {
        const latRatio =
          response.body.features[0].geometry.coordinates[1] /
          geometry.location.lat;
        const lngRatio =
          response.body.features[0].geometry.coordinates[0] /
          geometry.location.lng;

        const lowerBound = 1 - tolerance / 100;
        const upperBound = 1 + tolerance / 100;

        if (
          lowerBound <= latRatio &&
          latRatio <= upperBound &&
          lowerBound <= lngRatio &&
          lngRatio <= upperBound
        ) {
          return response.body.features[0].id; // mapbox place id
        } else {
          throw new Error(
            `The Google Maps and Mapbox position (lat/lng) did not match within ${tolerance}%.
            Lat : ${lowerBound} <= ${latRatio} <= ${upperBound}
            Lng : ${lowerBound} <= ${lngRatio} <= ${upperBound}`
          );
        }
      });
  };

  const convert = id => {
    return googleAddress(id).then(address => mapboxId(address.json.results[0]));
  };

  google && mapbox
    ? init()
    : (() => {
        throw new Error("Missing API key(s).");
      })();

  return id
    ? convert(id)
    : (() => {
        throw new Error("Missing ID key.");
      })();
};
