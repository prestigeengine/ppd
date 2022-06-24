const mongoose = require('mongoose');


// Create a schema
const packageSchema = mongoose.Schema({
// _ID needs to be made uniquely by the mongoose lib.
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    content: {type: String, required: true},
    dependents: {type: Array, required: true},
    version: {type: String, required: true},
    publisher: {type: String, required: true},
    lastPublished: {type: String, required: true},
    createdAt: {type: String, required: true}
});

// Export model to mongoose...("name of collection", const, "name of collection")
module.exports = mongoose.model("packages", packageSchema, "packages");