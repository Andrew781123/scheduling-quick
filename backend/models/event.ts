import mongoose from "mongoose";
import { IEvent, TimeSlot } from "../../types";

class TimeSlots extends mongoose.SchemaType {
  constructor(key: any, options: any) {
    super(key, options, "Time");
  }

  cast(timeArray: TimeSlot) {
    if (typeof timeArray[0] !== "number" || typeof timeArray[1] !== "number") {
      throw new Error("First two element of available time must be numbers");
    }

    if (!Array.isArray(timeArray[2])) {
      throw new Error("List of available person must be of type array");
    }

    for (let i = 0; i < timeArray[2].length; i++) {
      if (typeof timeArray[2][i] !== "string") {
        throw new Error("Person available must be of type string");
      }
    }

    return timeArray;
  }
}

const Types: any = mongoose.Schema.Types;
Types.TimeSlots = TimeSlots;

interface EventDocument extends mongoose.Document, IEvent {
  participants: {
    name: string;
    timeAvailable: mongoose.Types.Map<TimeSlot[]>;
  }[];

  // commonDate: mongoose.Types.Map<TimeSlot>;
}

interface EventModel extends mongoose.Model<EventDocument> {}

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  timeAvailable: {
    type: Map,
    of: {
      type: TimeSlots
    },
    required: true
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

  commonDate: {
    type: Map,
    of: Array
  },

  linkPassword: String,

  authPassword: String
});

const Event = mongoose.model<EventDocument, EventModel>("event", eventSchema);

export default Event;
