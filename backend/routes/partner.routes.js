import express from 'express';
import {
  getPartners,
  createPartner,
  deletePartner,
  createPartnerRequest,
  getPartnersRequests,
  deletePartnerRequest,
  updatePartner,
} from '../controllers/partner.controllers.js';

const router = express.Router();

router.get('/get', getPartners);
router.post('/create', createPartner);
router.put('/update/:id', updatePartner);
router.delete('/delete/:id', deletePartner);
router.post('/create-partner-request', createPartnerRequest);
router.get('/requests', getPartnersRequests);
router.delete('/requests/delete/:id', deletePartnerRequest);

export default router;
