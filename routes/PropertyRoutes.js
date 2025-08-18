import express from 'express';
import {
  create,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  verifyPayment
} from '../controllers/PropertiesController.js';

const router = express.Router();

router.post('/property', create);
router.get('/properties', getAllProperties);
router.get('/property/:id', getPropertyById);
router.put('/properties/:id', updateProperty);
router.delete('/properties/:id', deleteProperty);
router.post('/verify-payment', verifyPayment);



export default router;






