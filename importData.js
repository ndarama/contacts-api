const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contact = require('./models/Contact');
const data = require('./data.json');

dotenv.config();

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await Contact.deleteMany(); // Clear existing data
        await Contact.insertMany(data);
        console.log('Data imported successfully.');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error.message);
        process.exit(1);
    }
};

importData();
