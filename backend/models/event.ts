import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  timeAvailable: {
    type: Map,
    of: Array
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
