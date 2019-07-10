// trips-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const trips = new Schema(
    {
      tripName: {
        type: String,
        required: true
      },
      tripDate: {
        type: Date,
        required: true
      },
      tripCost: Number,
      isSharingCost: {
        type: Boolean,
        default: false
      },
      isRecurrent: {
        type: Boolean,
        default: false
      },
      recurrenceTimes: {
        type: Number,
        default: 0
      },
      recurrenceType: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'daily'
      }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('trips', trips);
};
