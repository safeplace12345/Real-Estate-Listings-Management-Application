import csvtojson from "csvtojson";
import path from "path";
import { listingsModel } from "../lib/schemas/listing";

export const seedDb = async () => {
  const pathToFile = path.join(__dirname, "../lib/NY-House-Dataset.csv");
  const rows = await csvtojson().fromFile(pathToFile);
  const mapped = rows.map((row) => ({
    brokerTitle: row.BROKERTITLE,
    type: row.TYPE,
    price: row.PRICE,
    beds: row.BEDS,
    bath: row.BATH,
    propertySqft: row.PROPERTYSQFT,
    address: row.ADDRESS,
    state: row.STATE,
    mainAddress: row.MAIN_ADDRESS,
    administrativeAreaLevel2: row.ADMINISTRATIVE_AREA_LEVEL_2,
    locality: row.SUBLOCALITY,
    subLocality: row.LOCALITY,
    streetName: row.STREET_NAME,
    longName: row.LONG_NAME,
    formattedAddress: row.FORMATTED_ADDRESS,
    latitude: row.LATITUDE,
    longitude: row.LONGITUDE,
  }));

  return await listingsModel
    .insertMany(mapped)
    .then(() => "Casting Seed successfully");
};
