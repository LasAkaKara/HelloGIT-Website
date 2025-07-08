import Project from '../models/project.models.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch projects' });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    return res.status(201).json(project);
  } catch (err) {
    if (err.name === 'ValidationError')
      return res.status(400).json({ msg: 'Validation failed', errors: err.errors });
    return res.status(500).json({ msg: 'Server error' });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch project' });
  }
}; 