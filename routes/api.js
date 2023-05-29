'use strict';
const User = require('../connection/models');
const {getAllIssues, addNewIssue, editIssue, deleteIssue} = require("../controllers/functions");

module.exports = function (app) {

  app.route('/api/issues/:project') 
    .get(getAllIssues)   
    .post(addNewIssue)
    .put(editIssue)
    .delete(deleteIssue)
};
