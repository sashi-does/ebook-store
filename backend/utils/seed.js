import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from '../models/Book.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';

dotenv.config();

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    description: 'A story of values, wealth, and love in the 1920s Long Island.',
    ISBN: '9780743273565',
    price: 15.99,
    stock: 25,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    description: 'A powerful drama about racial injustice and the destruction of innocence in the American South.',
    ISBN: '9780061120084',
    price: 12.49,
    stock: 18,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    description: 'A classic dystopian novel exploring state surveillance, total control, and freedom restriction.',
    ISBN: '9780451524935',
    price: 9.99,
    stock: 40,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    genre: 'Science',
    description: 'An easy-to-read guide explaining the origins of cosmology, gravity, black holes, and the universe.',
    ISBN: '9780553380163',
    price: 18.99,
    stock: 12,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    description: 'An easy and proven way to build good habits and break bad ones.',
    ISBN: '9780735211292',
    price: 16.20,
    stock: 50,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    description: 'The prelude to Lord of the Rings, featuring Bilbo Baggins\' epic quest.',
    ISBN: '9780345339683',
    price: 14.95,
    stock: 30,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&q=80&w=400',
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Seed: Connected to Database...');

    // Clear existing
    await Book.deleteMany({});
    console.log('Seed: Cleared Books collection.');

    // Insert sample books
    await Book.insertMany(sampleBooks);
    console.log('Seed: Inserted sample books.');

    console.log('Seed Completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
