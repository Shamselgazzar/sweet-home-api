import mongoose from 'mongoose';
import { Apartment } from './models/apartment.model';
import { createApi } from 'unsplash-js';
import dotenv from 'dotenv';

dotenv.config();

// Unsplash API setup
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || ''
});

const getUnsplashImageUrls = async (query: string, count: number): Promise<string[]> => {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage: count,
    });

    if (result.response?.results) {
      console.log('result:', result.response.results.length)
      const urls = result.response.results.map(photo => photo.urls.small);
      return urls;
    } else {
      console.error('No results found for the query:', query);
      return [];
    }
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return [];
  }
};

const apartments = [
  {
    name: 'Luxury Apartment Downtown',
    unitNumber: '101',
    project: 'City Towers',
    price: 85000,
    location: 'Downtown',
    description: 'A luxury apartment with great views of the city.',
    images: ['lux1.jpg', 'lux2.jpg'],
    rooms: 3,
    size: 120,
    available: true,
  },
  {
    name: 'Cozy Studio',
    unitNumber: '305',
    project: 'Skyline Apartments',
    price: 45000,
    location: 'Uptown',
    description: 'A cozy studio perfect for students or young professionals.',
    images: ['studio1.jpg'],
    rooms: 1,
    size: 40,
    available: true,
  },
  {
    name: 'Family House',
    unitNumber: 'B12',
    project: 'Green Meadows',
    price: 120000,
    location: 'Suburbs',
    description: 'A large family house with a backyard and garage.',
    images: ['family1.jpg', 'family2.jpg'],
    rooms: 5,
    size: 220,
    available: false,
  },
  {
    name: 'Penthouse Suite',
    unitNumber: 'PH1',
    project: 'Grand Plaza',
    price: 250000,
    location: 'City Center',
    description: 'A luxurious penthouse suite with stunning views.',
    images: ['penthouse1.jpg', 'penthouse2.jpg'],
    rooms: 4,
    size: 300,
    available: true,
  },
  {
    name: 'Modern Apartment',
    unitNumber: '208',
    project: 'City Lights',
    price: 90000,
    location: 'Midtown',
    description: 'A modern apartment with an open-plan design.',
    images: ['modern1.jpg'],
    rooms: 2,
    size: 100,
    available: true,
  },
  {
    name: 'Affordable Apartment',
    unitNumber: '15A',
    project: 'Sunset Villas',
    price: 60000,
    location: 'East Side',
    description: 'Affordable housing for families on a budget.',
    images: ['affordable1.jpg'],
    rooms: 3,
    size: 80,
    available: true,
  },
  {
    name: 'Suburban Apartment',
    unitNumber: '42C',
    project: 'Quiet Valley',
    price: 70000,
    location: 'Suburban Area',
    description: 'A peaceful place to live, away from the city noise.',
    images: ['suburb1.jpg'],
    rooms: 3,
    size: 90,
    available: false,
  },
  {
    name: 'Spacious Loft',
    unitNumber: '3L',
    project: 'The Lofts',
    price: 105000,
    location: 'Creative District',
    description: 'A large loft apartment, ideal for creative people.',
    images: ['loft1.jpg'],
    rooms: 2,
    size: 150,
    available: true,
  },
  {
    name: 'Budget Apartment',
    unitNumber: '23B',
    project: 'Economy Suites',
    price: 35000,
    location: 'North Side',
    description: 'A budget-friendly apartment for a small family.',
    images: ['budget1.jpg'],
    rooms: 2,
    size: 60,
    available: false,
  },
  {
    name: 'Seaside Apartment',
    unitNumber: '12D',
    project: 'Ocean View',
    price: 125000,
    location: 'Coastline',
    description: 'A seaside apartment with beautiful ocean views.',
    images: ['seaside1.jpg', 'seaside2.jpg'],
    rooms: 3,
    size: 140,
    available: true,
  },
  {
    name: 'Green Living Apartment',
    unitNumber: '33A',
    project: 'EcoVillage',
    price: 95000,
    location: 'Greenbelt',
    description: 'An eco-friendly apartment with sustainable features.',
    images: ['green1.jpg', 'green2.jpg'],
    rooms: 3,
    size: 110,
    available: true,
  },
  {
    name: 'Mountain Retreat',
    unitNumber: '8C',
    project: 'Highland Cottages',
    price: 180000,
    location: 'Mountain Area',
    description: 'A cozy retreat in the mountains with amazing views.',
    images: ['mountain1.jpg'],
    rooms: 4,
    size: 200,
    available: true,
  },
  {
    name: 'City Studio',
    unitNumber: '9A',
    project: 'Downtown Studios',
    price: 48000,
    location: 'City Center',
    description: 'A small studio in the heart of the city, perfect for singles.',
    images: ['citystudio1.jpg'],
    rooms: 1,
    size: 35,
    available: false,
  },
  {
    name: 'Countryside Villa',
    unitNumber: '15D',
    project: 'Village Heights',
    price: 155000,
    location: 'Countryside',
    description: 'A villa in a peaceful countryside, ideal for relaxation.',
    images: ['countryside1.jpg'],
    rooms: 5,
    size: 250,
    available: true,
  }
];

// Function to seed the database
const seedApartments = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Connected to MongoDB');
    
    const imageUrls = await getUnsplashImageUrls("house", apartments.length);
    for (let i = 0; i < apartments.length; i++) {
      const page = i + 1;
      apartments[i].images = imageUrls.splice(0, 1);
    }

    await Apartment.deleteMany({});
    await Apartment.insertMany(apartments);
    console.log('Database seeded with apartments and Unsplash images');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

seedApartments();
