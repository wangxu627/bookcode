var redis = require("redis");

var client = redis.createClient(6379, "172.17.103.85");
client.on("error", function(err) {
    console.log("Error : " + err);
});
// client.on("ready", function(err) {
//     console.log("ready : " + err);
// });
// client.on("connect", function(err) {
//     console.log("connect : " + err);
// });


console.log(client.set("wangxu", "hahahha"));
client.get("wangxu", function(err, reply) {
    console.log("reply is : " + reply.toString());
});