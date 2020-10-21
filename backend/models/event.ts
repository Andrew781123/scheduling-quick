import mongoose from "mongoose";

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

type TimeSlot = [number, number, string[]];

interface IEvent extends mongoose.Document {
  info: {
    organizer: string;
    venue: {
      name?: string;
      googleMapLink?: string;
    };
  };

  period: {
    date: { fromDate: Date; toDate: Date }[];
    time: { fromTime: Date; toTime: Date }[];
  };

  participants: {
    name: string;
    timeAvailable: Map<string, TimeSlot>;
  };

  commonDate?: Map<string, TimeSlot>;

  timeInterval: number;

  linkPassword?: string;

  authPassword?: string;
}

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  timeAvailable: {
    type: Map,
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
    },

    period: {
      date: [
        {
          fromDate: {
            type: Date,
            required: true
          },

          toDate: {
            type: Date,
            required: true
          }
        }
      ],
      time: [
        {
          fromTime: {
            type: Date,
            required: true
          },

          toTime: {
            type: Date,
            required: true
          }
        }
      ]
    },

    participants: [participantSchema],

    commonDate: {
      type: Map,
      of: Array
    },

    timeInterval: {
      type: Number,
      default: 1
    },

    linkPassword: String,

    authPassword: String
  }
});

const Event = mongoose.model<IEvent>("event", eventSchema);

export default Event;
