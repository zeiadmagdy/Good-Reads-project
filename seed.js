const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { Author } = require('./models/Author');
const { Category } = require('./models/Category');
const { Book } = require('./models/Book');

const MONGO_URI = 'mongodb+srv://zeiadmagdy2019:zeiadmagdy1@cluster0.orqcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGO_URI)
    .then(async () => {

        console.log('Database connected');

        const authors = Array.from({ length: 15 }).map(() => ({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            nationality: faker.address.country(),
            image: faker.image.avatar(),
        }));

        const insertedAuthors = await Author.insertMany(authors, { ordered: false });

        const categories = Array.from({ length: 6 }).map(() => ({
            name: faker.commerce.department(),
            description: faker.lorem.sentence(),
        }));

        const insertedCategories = await Category.insertMany(categories, { ordered: false });


        const books = Array.from({ length: 30 }).map(() => ({

            title: faker.commerce.productName(),
            author: faker.helpers.arrayElement(insertedAuthors)._id,
            Category: faker.helpers.arrayElement(insertedCategories)._id,
            description: faker.lorem.paragraph(),
            rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
            review: faker.lorem.sentence(),
            price: faker.commerce.price(5, 50),
            image: faker.image.imageUrl(200, 300, 'books', true),
        }));

        await Book.insertMany(books, { ordered: false });

        console.log('Data seeded successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error seeding data:', err);
    });

