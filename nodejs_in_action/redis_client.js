var redis = require("redis");
var net = require("net");

var server = net.createServer(function(socket) {
    var subscriber;
    var publisher;

    console.log("ccccccccccc");

    //socket.on("connect", function(){
        console.log("connect");
        subscriber = redis.createClient();
        subscriber.subscribe("main_chat_room");

        subscriber.on("message", function(channel, message) {
            socket.write("Channel " + channel + ": " + message);
        });
        publisher = redis.createClient();
    //});

    socket.on("data", function(data) {
        console.log("publisher:" + publisher)
        publisher.publish("main_chat_room", data);
    });

    socket.on("end", function() {
        subscriber.unsubscribe("main_chat_room");
        subscriber.end();
        publisher.end();
    })
});

server.listen(3000);

// var client = redis.createClient(6379, "172.17.103.85");
// client.on("error", function(err) {
//     console.log("Error : " + err);
// });
// client.on("ready", function(err) {
//     console.log("ready : " + err);
// });
// client.on("connect", function(err) {
//     console.log("connect : " + err);
// });


// console.log(client.set("wangxu", "hahahha"));
// client.get("wangxu", function(err, reply) {
//     console.log("reply is : " + reply.toString());
// });

