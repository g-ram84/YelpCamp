const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require('./seedHelpers');
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
	console.log("Database Connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({})
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000)
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '6033113e460fcb2c0bf1801c',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [{
				url:
					'https://res.cloudinary.com/dw9eocpsf/image/upload/v1614024944/YelpCamp/wwzkc7jldvfeadnsvkw2.jpg',
				filename: 'YelpCamp/wwzkc7jldvfeadnsvkw2'
			},
			{
				url:
					'https://res.cloudinary.com/dw9eocpsf/image/upload/v1614024945/YelpCamp/ch7kn7dwtidvo90w56xq.jpg',
				filename: 'YelpCamp/ch7kn7dwtidvo90w56xq'
			},
			{
				url:
					'https://res.cloudinary.com/dw9eocpsf/image/upload/v1614024898/YelpCamp/xt6eocf4maqdmc1cowxk.jpg',
				filename: 'YelpCamp/xt6eocf4maqdmc1cowxk'
			},
			{
				url:
					'https://res.cloudinary.com/dw9eocpsf/image/upload/v1614024903/YelpCamp/sjyggnezf5mcer28hiu6.jpg',
				filename: 'YelpCamp/sjyggnezf5mcer28hiu6'
			}
			],
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum enim lorem, mattis et nisi quis, facilisis tempus leo. Cras sed.',
			price,
			geometry: {
				type: 'Point',
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude
				]
			},
		})
		await camp.save();
	}
}

seedDB().then(() => {
	mongoose.connection.close()
})
