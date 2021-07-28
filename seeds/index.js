const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60fd6a377c82a40d98750e9e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            geometry: { type: 'Point', 
                        coordinates: [
                            cities[random1000].longitude,
                            cities[random1000].latitude,
                        ]
                },
            price,
            images:  [
                {
                  
                  url: 'https://res.cloudinary.com/hritik-cloud/image/upload/v1627388805/YelpCamp/zikai5rmo0bmj4skcpsn.jpg',
                  filename: 'YelpCamp/zikai5rmo0bmj4skcpsn'
                },
                {
                 
                  url: 'https://res.cloudinary.com/hritik-cloud/image/upload/v1627388807/YelpCamp/w604vakxfujarwlikdlj.jpg',
                  filename: 'YelpCamp/w604vakxfujarwlikdlj'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})