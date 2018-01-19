var nodemailer = require('nodemailer');

var mailTransport = nodemailer.createTransport({ 
    service: 'Gmail',
    auth: {
        user: "wangxu627@gmail.com",
        pass: "wangx8962789620u",
    } 
});
console.log(mailTransport);
mailTransport.sendMail({
    from: 'wangxu627@gmail.com',
    to: '1525496905@qq.com',
    subject: 'Your Meadowlark Travel Tour 2222222222',
    text: 'Thank you for booking your trip with Meadowlark Travel.'+
        'We look forward to your visit!', 
}, function(err){
    if(err) console.error( 'Unable to send email: ' + err );
});