'use strict';
const User = require('../connection/models');

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async function (req, res){
      let project = req.params.project;
      
      try
      {
        const data = await User.find({});
        res.status(200).json(data);
      }
      catch(err)
      {
        console.log(err);
        res.status(500).json({msg: err});
      }
    })
    
    .post(async function (req, res){
      let project = req.params.project;
      
      try
      {
        const body = req.body
        const isTrue = /^true$/i;

        body.open = isTrue.test(body.open) ? true : false;
        const date = new Date();
        body.created_on = date.toISOString();
        body.updated_on = date.toISOString();

        const entry = new User(body);
        const response = await entry.save();
        res.status(200).json(response);
      }
      catch(err)
      {
        console.log(err);
        res.status(500).json({msg: err});
      }
    })
    
    .put(async function (req, res){
      let project = req.params.project;

      try
      {
        const body = req.body;
        let changedContent = {...body};
        delete changedContent._id;
        const date = new Date();
        body.updated_on = date.toISOString();

        //Removing empty entries in object that needs to be amended in DB
        for(const prop in changedContent)
        {
          if(changedContent[prop] === "")
          {
            delete changedContent[prop];
          }
        }
    
        console.log(changedContent);
        const response = await User.findByIdAndUpdate(body._id, changedContent);

        if(!response)
        {
          return res.status(404).send(`No entry with object id ${body._id}`)
        }

        res.status(200).json(response);
      }
      catch(err)
      {
        console.log(err);
        res.status(500).json({msg: err});
      }    
    })
    
    .delete(async function (req, res){
      let project = req.params.project;
      
      try
      {
        const issueId = req.body._id;
        const response = await User.findByIdAndDelete(issueId);

        if(!response)
        {
          return res.status(404).send(`No issue with id ${issueId}`);
        }
        res.status(200).json(response);
      }
      catch(err)
      {
        console.log(err);
        res.status(500).json({msg: err});
      }
    });
    
};
