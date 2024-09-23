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
      console.log('number of images:', result.response.results.length)
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
    moreDetails: 'Close to restaurants and shops.',
    images: ['lux1.jpg', 'lux2.jpg'],
    rooms: 3,
    bathrooms: 2,
    size: 120,
    yearBuilt: 2015,
    available: true,
  },
  {
    name: 'Modern Apartment Uptown',
    unitNumber: '203',
    project: 'Uptown Plaza',
    price: 75000,
    location: 'Uptown',
    description: 'A modern apartment with sleek interiors.',
    moreDetails: 'Near parks and public transport.',
    images: ['mod1.jpg', 'mod2.jpg'],
    rooms: 2,
    bathrooms: 1,
    size: 100,
    yearBuilt: 2018,
    available: true,
  },
  {
    name: 'Cozy Apartment Suburbs',
    unitNumber: '305',
    project: 'Green Valley',
    price: 65000,
    location: 'Suburbs',
    description: 'A cozy apartment perfect for small families.',
    moreDetails: 'Quiet neighborhood with nearby schools.',
    images: ['cozy1.jpg', 'cozy2.jpg'],
    rooms: 3,
    bathrooms: 2,
    size: 110,
    yearBuilt: 2012,
    available: false,
  },
  {
    name: 'Penthouse Downtown',
    unitNumber: 'PH1',
    project: 'Skyline Towers',
    price: 150000,
    location: 'Downtown',
    description: 'A luxurious penthouse with stunning views.',
    moreDetails: 'Private elevator and rooftop access.',
    images: ['pent1.jpg', 'pent2.jpg'],
    rooms: 4,
    bathrooms: 3,
    size: 200,
    yearBuilt: 2020,
    available: true,
  },
  {
    name: 'Affordable Apartment Northside',
    unitNumber: '112',
    project: 'Maple Residences',
    price: 55000,
    location: 'Northside',
    description: 'An affordable apartment with great amenities.',
    moreDetails: 'Gym and pool included.',
    images: ['afford1.jpg', 'afford2.jpg'],
    rooms: 2,
    bathrooms: 1,
    size: 90,
    yearBuilt: 2010,
    available: false,
  },
  {
    name: 'Beachfront Apartment',
    unitNumber: '201',
    project: 'Ocean Breeze',
    price: 120000,
    location: 'Beachfront',
    description: 'A beautiful beachfront apartment.',
    moreDetails: 'Direct beach access and sea views.',
    images: ['beach1.jpg', 'beach2.jpg'],
    rooms: 3,
    bathrooms: 2,
    size: 130,
    yearBuilt: 2017,
    available: true,
  },
  {
    name: 'Historic Loft',
    unitNumber: '409',
    project: 'Old Town Lofts',
    price: 95000,
    location: 'Old Town',
    description: 'A charming loft in a historic building.',
    moreDetails: 'Original brick walls and wooden beams.',
    images: ['loft1.jpg', 'loft2.jpg'],
    rooms: 2,
    bathrooms: 2,
    size: 140,
    yearBuilt: 1890,
    available: true,
  },
  {
    name: 'Studio Apartment',
    unitNumber: 'B1',
    project: 'Sunset Studios',
    price: 40000,
    location: 'East End',
    description: 'A small and affordable studio apartment.',
    moreDetails: 'Perfect for singles or young professionals.',
    images: ['studio1.jpg', 'studio2.jpg'],
    rooms: 1,
    bathrooms: 1,
    size: 50,
    yearBuilt: 2021,
    available: false,
  },
  {
    name: 'Suburban Duplex',
    unitNumber: 'D2',
    project: 'Sunnydale',
    price: 80000,
    location: 'Suburbs',
    description: 'A spacious duplex with a private garden.',
    moreDetails: 'Family-friendly area.',
    images: ['duplex1.jpg', 'duplex2.jpg'],
    rooms: 4,
    bathrooms: 2,
    size: 150,
    yearBuilt: 2016,
    available: true,
  },
  {
    name: 'Luxury Apartment Southside',
    unitNumber: '301',
    project: 'Grand Residences',
    price: 130000,
    location: 'Southside',
    description: 'A luxury apartment with top-notch amenities.',
    moreDetails: 'Private gym and pool.',
    images: ['luxsouth1.jpg', 'luxsouth2.jpg'],
    rooms: 4,
    bathrooms: 3,
    size: 180,
    yearBuilt: 2019,
    available: true,
  },
  {
    name: 'City Apartment Westside',
    unitNumber: '101',
    project: 'Westside Towers',
    price: 70000,
    location: 'Westside',
    description: 'A modern city apartment with quick access to downtown.',
    moreDetails: 'Perfect for commuters.',
    images: ['west1.jpg', 'west2.jpg'],
    rooms: 2,
    bathrooms: 2,
    size: 105,
    yearBuilt: 2015,
    available: true,
  },
  {
    name: 'Student Apartment',
    unitNumber: 'S3',
    project: 'Campus Heights',
    price: 50000,
    location: 'University District',
    description: 'A budget-friendly student apartment near campus.',
    moreDetails: 'Furnished and utilities included.',
    images: ['student1.jpg', 'student2.jpg'],
    rooms: 2,
    bathrooms: 1,
    size: 70,
    yearBuilt: 2010,
    available: false,
  },
  {
    name: 'Mountain View Apartment',
    unitNumber: '402',
    project: 'Highland Retreat',
    price: 100000,
    location: 'Mountain District',
    description: 'An apartment with scenic mountain views.',
    moreDetails: 'Outdoor hiking trails nearby.',
    images: ['mountain1.jpg', 'mountain2.jpg'],
    rooms: 3,
    bathrooms: 2,
    size: 140,
    yearBuilt: 2022,
    available: true,
  },
  {
    name: 'Riverside Apartment',
    unitNumber: 'R7',
    project: 'Riverfront Heights',
    price: 95000,
    location: 'Riverside',
    description: 'A peaceful riverside apartment with serene views.',
    moreDetails: 'Close to nature trails and parks.',
    images: ['river1.jpg', 'river2.jpg'],
    rooms: 3,
    bathrooms: 2,
    size: 135,
    yearBuilt: 2018,
    available: true,
  }
];


// Function to seed the database
const seedApartments = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Connected to MongoDB');
    
    const imageUrls = await getUnsplashImageUrls("house", apartments.length+2);
    
    for (let i = 0; i < apartments.length; i++) {
      apartments[i].images = [imageUrls[i], imageUrls[i+1], imageUrls[i+2]];
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
