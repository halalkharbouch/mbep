import express from 'express';
import { getProjects, updateProject } from '../controllers/projects.controllers.js';

const router = express.Router();

router.get('/get', getProjects);
router.put('/update/:id', updateProject);

export default router