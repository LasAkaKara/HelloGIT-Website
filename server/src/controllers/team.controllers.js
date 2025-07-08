import TeamMember from '../models/team.models.js';

export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find({});
    res.json(members);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch team members' });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    await member.save();
    return res.status(201).json(member);
  } catch (err) {
    console.log(err)
    if (err.name === 'ValidationError')
      return res.status(400).json({ msg: 'Validation failed', errors: err.errors });
    return res.status(500).json({ msg: 'Server error' });
  }
};

export const getTeamMemberById = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ msg: 'Team member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch team member' });
  }
}; 