const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts',
    },
    host: 'contacts-api-k12u.onrender.com/',
    schemes: ['https'],
    basePath: '/api/contacts',
    definitions: {
        Contact: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            favoriteColor: 'Blue',
            birthday: '1990-01-01',
        },
    },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);