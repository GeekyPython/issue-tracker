const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    issue_title: {type: String, required: true},
    issue_text: {type: String, required: true},
    created_on: String,
    updated_on: String,
    created_by: {type: String, required: true},
    assigned_to: String,
    open: Boolean,
    status_text: String
});

module.exports = mongoose.model("Issue", UserSchema);