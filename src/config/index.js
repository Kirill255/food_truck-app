module.exports = {
  port: 3000,
  dbURL: "mongodb://localhost/food_truck-app",
  dbOptions: {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
  },
  auth: {
    TOKENTIME: 60 * 60 * 24 * 30,
    SECRET: "fEsp jw lwad oqsakjwf"
  }
};
