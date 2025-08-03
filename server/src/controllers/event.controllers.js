import Event from "../models/event.models.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
    console.log("Fetched events: ", events);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export const getEventsById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    return res.status(201).json(event);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ msg: "Event not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Event not found" });
    return res.json({ msg: "Event deleted" });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};
