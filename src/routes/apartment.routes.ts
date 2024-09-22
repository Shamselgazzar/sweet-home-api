import { Router } from 'express';
import { getApartments, getApartmentById, addApartments } from '../controllers/apartment.controller';

const router = Router();

/**
 * @swagger
 * /api/apartments:
 *   get:
 *     summary: Get a paginated list of apartments
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of apartments with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apartments:
 *                   type: array
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalApartments:
 *                   type: integer
 *       404:
 *         description: No apartments found
 *       500:
 *         description: Server error
 */
router.get('/apartments', getApartments);

/**
 * @swagger
 * /api/apartments/{id}:
 *   get:
 *     summary: Get apartment by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The apartment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Apartment details
 *       400:
 *         description: Invalid apartment ID
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Server error
 */
router.get('/apartments/:id', getApartmentById);

/**
 * @swagger
 * /api/apartments:
 *   post:
 *     summary: Add new apartment(s)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Apartment(s) added successfully
 *       500:
 *         description: Server error
 */
router.post('/apartments', addApartments);

export default router;
