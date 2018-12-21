import { createClient as googleClient } from "@google/maps";
const mapboxClient = require("@mapbox/mapbox-sdk/services/geocoding");

const checkParameters = ({
  id,
  google,
  mapbox
}: {
  id: string;
  google: string;
  mapbox: string;
}) => {
  id ||
    (() => {
      throw new Error("Missing Google Spot ID.");
    })();
  (google && mapbox) ||
    (() => {
      throw new Error("Missing API key(s).");
    })();
};

const createClients = ({
  google,
  mapbox
}: {
  google: string;
  mapbox: string;
}) => ({
  googleClient: googleClient({
    key: google,
    Promise: Promise
  }),
  mapboxClient: mapboxClient({
    accessToken: mapbox
  })
});

const googleSpotToLocation = async ({
  id,
  clients
}: {
  id: string;
  clients: any;
}) =>
  (await clients.googleClient.reverseGeocode({ place_id: id }).asPromise()).json
    .results[0].geometry.location;

const mapboxLocationToAddress = async ({
  lat,
  lng,
  clients
}: {
  lat: string;
  lng: string;
  clients: any;
}) =>
  (await clients.mapboxClient
    .reverseGeocode({
      query: [lng, lat],
      limit: 1
    })
    .send()).body.features[0].id;

export = async (
  id = "",
  { google = "", mapbox = "" } = {}
): Promise<string> => {
  checkParameters({ id, mapbox, google });

  const clients = createClients({ google, mapbox });

  const { lat, lng } = await googleSpotToLocation({ id, clients });

  return mapboxLocationToAddress({ lat, lng, clients });
};
