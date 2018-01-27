var mongoose = require('mongoose');
var config = require("./config");
var moments = require("./db/models/moments");


DB_URL = config.DB_URL;
var db = mongoose.connect(DB_URL);//；连接数据库
mongoose.connection.on('connected', function () {    
	console.log('Mongoose connection open to ' + DB_URL);  

	insertMoments(1000);


	// var Schema = mongoose.Schema;   //  创建模型
	// var userScheMa = new Schema({
	// 	name: String,
	// 	password: String
	// }); //  定义了一个新的模型，但是此模式还未和users集合有关联

	// var User = mongoose.model('users', userScheMa); //  与users集合关联
	// var user = new User({
    //     name : 'Tracy McGrady',                 //用户账号
    //     password: 'abcd',                            //密码
    // });

    // user.save(function (err, res) {
    //     if (err) {
    //         console.log("Error:" + err);
    //     }
    //     else {
	// 		console.log("Res:" + res);
	// 	}
		
	// 	var wherestr = {};
	// 	User.remove(wherestr, function(err, res){
	// 		if (err) {
	// 			console.log("Error:" + err);
	// 		}
	// 		else {
	// 			console.log("Res:" + res);
	// 		}
	// 	});
	// });
	
	// var wherestr = {'name' : 'Tracy McGrady'};
	// var updatestr = {'password': 'zzzz'};
	// User.update(wherestr, updatestr, function(err, res){
	// 	if (err) {
	// 		console.log("Error:" + err);
	// 	}
	// 	else {
	// 		console.log("Res:" + JSON.stringify(res));
	// 	}
	// });

	// User.remove(wherestr, function(err, res){
    //     if (err) {
    //         console.log("Error:" + err);
    //     }
    //     else {
    //         console.log("Res:" + res);
    //     }
	// })
	
	// var wherestr = {};
	// User.find(wherestr, function(err, res){
    //     if (err) {
    //         console.log("Error:" + err);
    //     }
    //     else {
    //         console.log("Res:" + res);
    //     }
    // })
}); 
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 

function insertMoments(cnt) {
	let p = moments.getMoments(0, 1);
	p.then((res) => {
		console.log(res);

		for(let i = 0;i < cnt;i++) {
			let mo = new moments.Moment({
				content : res[0].content,
				pictures : res[0].pictures,
				date : res[0].date - i * 100
			});
			moments.addMoment(mo);
		}
	});
}

// console.log(db);
// var test = db.model('users', userScheMa); //  与users集合关联
// console.log(test.user);