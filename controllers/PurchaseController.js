import Purchase from '../models/Purchase.js';

//  Create a new purchase
export const createPurchase = async (req, res) => {
  try {
    const { email, amount, item, date, propertyId} = req.body;

    if (!email || !amount || !item || !propertyId) {
      console.log()
      return res.status(400).json({ message: 'Email, amount, item and property id are required' });
    }

    const newPurchase = new Purchase({ email, amount, item, propertyId, date });
    const savedPurchase = await newPurchase.save();

    res.status(201).json({ message: 'Purchase created successfully', purchase: savedPurchase });
  } catch (error) {
    res.status(500).json({ message: 'Error creating purchase', error: error.message });
  }
};


//  Get all purchases
export const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();

    if (!purchases || purchases.length === 0) {
      console.log('No purchases found');
      return res.status(404).json({ message: 'No purchases found' });
      
    }

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchases', error: error.message });
  }
};



// export const getPurchaseById = async (req, res) => {
//   try {
//     const purchaseId = req.params.id;
//     const purchase = await Purchase.findById(purchaseId);

//     if (!purchase) {
//       return res.status(404).json({ message: 'Purchase not found' });
//     }

//     res.status(200).json(purchase);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching purchase', error: error.message });
//   }
// };

// //  Update purchase
// export const updatePurchase = async (req, res) => {
//   try {
//     const purchaseId = req.params.id;
//     const updatedPurchase = await Purchase.findByIdAndUpdate(purchaseId, req.body, { new: true });

//     if (!updatedPurchase) {
//       return res.status(404).json({ message: 'Purchase not found' });
//     }

//     res.status(200).json({ message: 'Purchase updated successfully', purchase: updatedPurchase });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating purchase', error: error.message });
//   }
// };

//  Delete purchase
export const deletePurchase = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const deletedPurchase = await Purchase.findByIdAndDelete(purchaseId);

    if (!deletedPurchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.status(200).json({ message: 'Purchase deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting purchase', error: error.message });
  }
};
