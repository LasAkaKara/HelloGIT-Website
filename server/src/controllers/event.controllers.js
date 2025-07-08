import Event from '../models/event.models.js';

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({})
        res.json(events)
    }
    catch(err){
        res.status(500).json({msg: err})
    }
};

export const getEventsById = async (req, res) => {
    try{
        const event = await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({msg: 'Event not found'});
        }
        res.json(event);
    }
    catch(err){
        res.status(500).json({msg: err})
    }
}

export const createEvent = async (req, res) => {
    try{
        const event = new Event(req.body);
        await event.save();
        return res.status(201).json(event);
    }
    catch(err){
        return res.status(500).json({msg : err})
    }
}