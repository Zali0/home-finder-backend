import Property from '../models/Properties.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SEC_KEY

// Create a new property
export const create = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();

    res.status(200).json({ message: 'Property created successfully', property: savedProperty });
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};

// Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: 'No properties found' });
    }
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

// Get property by ID
export const getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
};

// Update property by ID
export const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const updatedProperty = await Property.findByIdAndUpdate(propertyId, req.body, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error: error.message });
  }
};

// Delete property by ID
export const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};


// Verify payment
export const verifyPayment =  async (req, res) => {
  const { reference, propertyId, amount, email } = req.body;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      }
    );

    

    if (response.data.status && response.data.data.status === "success") {
      // TODO: Save transaction and update property
      return res.json({ status: "success", data: response.data.data });
    } else {
      return res.json({ status: "failed", message: "Payment not verified" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Verification failed" });
  }
};
