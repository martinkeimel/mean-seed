'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['mongoose'], function(mongoose) {

  var Schema   = mongoose.Schema;

  var RoleSchema = new Schema({
    roleName: {
      type: String,
      unique: true,
      required: true
    },
    resources: [ { type: Schema.ObjectId, ref: 'resource' } ]
  });

  return mongoose.model('role', RoleSchema);

});
