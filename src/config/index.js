module.exports = {
	port: 3000,
	dbURL: "mongodb://localhost/food_truck-app",
	dbOptions: {
		useNewUrlParser: true,
		reconnectTries: Number.MAX_VALUE,
	}
};
