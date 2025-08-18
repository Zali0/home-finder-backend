import express from 'express';
import {
  createPurchase,
  getAllPurchases,
//   getPurchaseById,
//   updatePurchase,
  deletePurchase
} from '../controllers/PurchaseController.js';

const router = express.Router();

router.post('/purchase', createPurchase);
router.get('/purchases', getAllPurchases);
// router.get('/purchase/:id', getPurchaseById);
// router.put('/purchases/:id', updatePurchase);
router.delete('/purchases/:id', deletePurchase);

export default router;
