const User = require('../connection/models');

const getAllIssues = async function (req, res){
    try
    {
      const query = req.query;
      const data = await User.find(query);
      res.status(200).json(data);
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({msg: err});
    }
}

const addNewIssue = async function (req, res){  
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

      console.log(body, response);
      res.status(200).json(response);
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({error: 'required field(s) missing'});
    }
}

const editIssue = async function (req, res){
    try
    {
      const body = req.body;
      let changedContent = {...body};
      delete changedContent._id;
      const issueId = body._id;

      //console.log("--------------------------------------------------------------")
      //console.log(changedContent);

      //Removing empty entries in object that needs to be amended in DB
      for(const prop in changedContent)
      {
        if(changedContent[prop] === "")
        {
          delete changedContent[prop];
        }
      }

      if(Object.keys(changedContent).length === 0)
      {
        return res.send({ error: 'no update field(s) sent', '_id': issueId });
      }

      const date = new Date();
      changedContent.updated_on = date.toISOString();
      //console.log(changedContent);
      //console.log("--------------------------------------------------------------")
      const response = await User.findByIdAndUpdate(body._id, changedContent);

      if(!response)
      {
        return res.status(404).json({error: "could not update", _id: issueId})
      }
      res.status(200).json({result: "successfully updated", _id: issueId});
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({msg: err});
    }    
}

const deleteIssue = async function (req, res){
    try
    {
      const issueId = req.body._id;

      if(!issueId)
      {
        return res.send({error: 'missing _id'});
      }
      const response = await User.findByIdAndDelete(issueId);

      if(!response)
      {
        return res.status(404).json({error: "could not delete", _id: issueId});
      }
      res.status(200).json({result: "successfully deleted", _id: issueId});
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({msg: err});
    }
}

module.exports = {getAllIssues, addNewIssue, editIssue, deleteIssue}