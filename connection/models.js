const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    issue_title: String,
    issue_text: String,
    created_on: String,
    updated_on: String,
    create_by: String,
    assigned_to: String,
    open: Boolean,
    status_text: String
});

module.exports = mongoose.model("Issue", UserSchema);