/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	chat: function(req, res){
    var data = {
      name: req.param('name'),
      message: req.param('message')
    };
	Message.query("INSERT into message(`name`,`message`)VALUES('"+req.param('name')+"','"+req.param('message')+"')",function(err,rows){
		if(!err) {
			Message.publishCreate({id:rows.insertId, name:data.name, message:data.message});
		} else {
			sails.log(rows);
		}
	});
  },
	subscribe: function(req, res){
		Message.watch(req);
	},
	index : function(req,res) {
		Message.query("SELECT * FROM `message` ORDER by `createdAt` DESC",function(err,rows){
			if(err) {
				res.json({"error" : true,"message" : "database error"});
			} else {
				res.ok(rows);
			}
		});
	}
};
