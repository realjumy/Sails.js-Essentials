/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index:function (req,res) {

		var data = req.params.all();

		if(req.isSocket && req.method === 'POST') {
			Chat.query('INSERT into `chat` (`user`,`message`) VALUES ("'+data.user+'","'+data.message+'")',function(err,rows){
				if(err) {
					sails.log(err);
					sails.log("Error occured in database operation");
				} else {
					Chat.publishCreate({id: rows.insertId, message : data.message , user:data.user});
				}
			});
		} else if(req.isSocket){
			Chat.watch(req.socket);
			sails.log( 'User subscribed to ' + req.socket.id );
		}
		if(req.method === 'GET') {
			Chat.query('SELECT * FROM `chat`',function(err,rows){
				if(err) {
					sails.log(err);
					sails.log("Error occured in database operation");
				} else {
					res.send(rows);
				}
			});
		}
	}
};
