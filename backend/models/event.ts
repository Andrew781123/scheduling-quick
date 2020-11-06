import mongoose from "mongoose";
import { period, TimeSlot } from "../../frontend/src/shared/types";

class Time extends mongoose.SchemaType {
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

export interface IEvent {
  info: {
    organizer: string;
    venue: {
      name?: string;
      googleMapLink?: string;
    };
  };

  periods: period[];

  participants?: {
    name: string;
    timeAvailable: Map<string, TimeSlot>;
  };

  commonDate?: Map<string, TimeSlot>;

  linkPassword?: string;

  authPassword?: string;
}

interface EventDocument extends mongoose.Document, IEvent {
  participants?: {
    name: string;
    timeAvailable: mongoose.Types.Map<TimeSlot>;
  };

  commonDate?: mongoose.Types.Map<TimeSlot>;
}

interface EventModel extends mongoose.Model<EventDocument> {}

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  timeAvailable: {
    type: mongoose.Types.Map,
    of: {
      type: Time
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
