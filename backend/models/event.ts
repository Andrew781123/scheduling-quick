import mongoose from "mongoose";
import { IEvent, TimeSlot } from "../../types";

class TimeSlots extends mongoose.SchemaType {
  constructor(key: any, options: any) {
    super(key, options, "Time");
  }

  cast(timeSlots: TimeSlot[]) {
    for(const timeSlot of timeSlots) {
      if (typeof timeSlot[0] !== "string" || typeof timeSlot[1] !== "string") {
        throw new Error("First two element of available time must be numbers");
      }
  
      if (!Array.isArray(timeSlot[2])) {
        throw new Error("List of available person must be of type array");
      }
  
      for (let i = 0; i < timeSlot[2].length; i++) {
        if (typeof timeSlot[2][i] !== "string") {
          throw new Error("Person available must be of type string");
        }
      }
    }

    return timeSlots;
  }
}

const Types: any = mongoose.Schema.Types;
Types.TimeSlots = TimeSlots;

interface EventDocument extends mongoose.Document, IEvent {
  // participants: {
  //   name: string;
  //   timeAvailable: {};
  // }[];
  // commonDate: mongoose.Types.Map<TimeSlot>;
}

interface EventModel extends mongoose.Model<EventDocument> {}

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  timeAvailable: {
    type: mongoose.Schema.Types.Mixed,
    requied: true
  }
});

const eventSchema = new mongoose.Schema({
  info: {
    organizer: {
      type: String,
      required: true
    },

    venue: {
      name: {
        type: String
      },

      googleMapLink: String
    }
  },

  periods: [
    {
      dateRange: [String],
      timeRange: [Number]
    }
  ],

  participants: [participantSchema],

  commonAvailable: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },

  linkPassword: String,

  authPassword: String
});

const Event = mongoose.model<EventDocument, EventModel>("event", eventSchema);

export default Event;
