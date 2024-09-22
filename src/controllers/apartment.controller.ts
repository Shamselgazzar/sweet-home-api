import { Request, Response } from 'express';
import { Apartment } from '../models/apartment.model';

// Get all apartments
export const getApartments = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const apartments = await Apartment.find().skip(skip).limit(limit);
    const totalApartments = await Apartment.countDocuments();
    const totalPages = Math.ceil(totalApartments / limit);

    if (!apartments.length) {
      return res.status(404).json({ message: 'No apartments found' });
    }

    res.status(200).json({
      apartments,
      currentPage: page,
      totalPages,
      totalApartments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching apartments', error });
  }
};

// Get apartment details
export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching apartment details', error });
  }
};

// Add new apartments (one or multiple)
export const addApartments = async (req: Request, res: Response) => {
  try {
    const apartments = Array.isArray(req.body) ? req.body : [req.body];
    
    const savedApartments = await Apartment.insertMany(apartments);
    res.status(201).json(savedApartments);
  } catch (error) {
    res.status(500).json({ message: 'Error adding apartments', error });
  }

};
