import Project from '../models/projects.model.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('parentPartner');
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params; // Get the project ID from the request parameters
  const updates = req.body; // Get the updates from the request body

  try {
    // Find the project by ID and update it
    const updatedProject = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    // Check if the project was found
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject); // Respond with the updated project
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors and other issues
  }
};

export const createProject = async (req, res) => {
  const project = req.body;
  const newProject = new Project(project);
  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
