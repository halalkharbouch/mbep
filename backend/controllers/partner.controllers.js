import Partner from '../models/partner.model.js';
import Project from '../models/projects.model.js';
import PartnerRequest from '../models/partnerRequest.model.js';

export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().populate('projects');
    res.status(200).json(partners);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPartner = async (req, res) => {
  const partner = req.body;
  const newPartner = new Partner(partner);
  try {
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePartner = async (req, res) => {
  const { id } = req.params; // Get the partner ID from the request parameters
  const updates = req.body; // Get the updates from the request body

  try {
    // Find the partner by ID and update it
    const updatedPartner = await Partner.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    // Check if the partner was found
    if (!updatedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.status(200).json(updatedPartner); // Respond with the updated partner
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors and other issues
  }
};

export const deletePartner = async (req, res) => {
  const id = req.params.id;
  try {
    await Partner.findByIdAndDelete(id);
    res.status(200).json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPartnerRequest = async (req, res) => {
  const partner = req.body;
  const newPartnerRequest = new PartnerRequest(partner);
  try {
    await newPartnerRequest.save();
    res.status(201).json(newPartnerRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPartnersRequests = async (req, res) => {
  try {
    const partnerRequests = await PartnerRequest.find();
    res.status(200).json(partnerRequests);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deletePartnerRequest = async (req, res) => {
  const id = req.params.id;

  try {
    await PartnerRequest.findByIdAndDelete(id);
    res.status(200).json({ message: 'Request Deleted Successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
